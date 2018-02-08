const { Jar } = require('../../models');
const slugify = require('slugify');
const _ = require('lodash');

module.exports = {
    listJars,
    createJar,
    getJar,
    updateJar,
    deleteJar,
    listJarIdeas,
    createJarIdea,
    getJarIdea,
    updateJarIdea,
    deleteJarIdea
};

async function listJars(req, res, next) {
    try {
        const jars = await Jar.find();
        return res.status(200).json({ jars });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

async function createJar(req, res, next) {
    const payload = req.body;
    const createJarFields = ['name', 'description', 'createdBy'];
    const requiredJarFields = ['name', 'createdBy'];

    requiredJarFields.forEach(field => {
        if (!payload[field]) {
            return res.status(401).json({ error: `Missing field: ${field}` })
        }
    });

    const jar = Object.assign(
        {},
        _.pick(payload, createJarFields),
        { slug: slugify(req.body.name) }
    );

    try {
        const createdJar = await Jar.create(jar);
        return res.status(201).json({ jar: createdJar });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

async function getJar(req, res, next) {
    const { jarSlug } = req.params;
    console.log(jarSlug);
    try {
        const jar = await Jar.findOne({ slug: jarSlug });
        return res.status(200).json({ jar });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

async function updateJar(req, res, next) {
    const updateableJarFields = ['name', 'description'];

    const { jarSlug } = req.params;

    const jar = Object.assign(
        {},
        _.pick(req.body, updateableJarFields)
    );

    try {
        const updatedJar = await Jar.findOneAndUpdate({ slug: jarSlug }, jar, { new: true });
        return res.status(200).json({ jar: updatedJar });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

async function deleteJar(req, res, next) {
    const { jarSlug } = req.params;
    try {
        await Jar.remove({ slug: jarSlug });
        return res.status(200).json({ message: 'Success' });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

async function listJarIdeas(req, res, next) {
    const { jarSlug } = req.params;
    try {
        const jar = await Jar.findOne({ slug: jarSlug });
        const { ideas } = jar;
        return res.status(200).json({ ideas });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

async function createJarIdea(req, res, next) {
    const payload = Object.assign({}, req.body);
    const { jarSlug } = req.params;
    const createIdeaFields = ['title', 'description', 'tags'];
    const requiredIdeaFields = ['title'];

    requiredIdeaFields.forEach(field => {
        if (!payload[field]) {
            return res.status(401).json({ error: `Missing field: ${field}` })
        }
    });

    const idea = Object.assign(
        {},
        _.pick(payload, createIdeaFields),
        payload.tags && Array.isArray(payload.tags)
            ? { tags: payload.tags.map(tag => tag.trim().toLowerCase()) }
            : {}
    );

    try {
        const updatedJar = await Jar.findOneAndUpdate(
            { slug: jarSlug },
            { $push: { ideas: idea } },
            { new: true }
        );
        return res.status(201).json({ jar: updatedJar });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

async function getJarIdea(req, res, next) {
    const { jarSlug, ideaId } = req.params;
    let jar;
    try {
        jar = await Jar.findOne({ slug: jarSlug, 'ideas._id': ideaId });
    } catch (e) {
        return res.status(500).json({ error: e });
    }

    if (!jar) {
        return res.status(404).json({ message: 'No idea jar with that slug found!' });
    }

    const idea = jar.ideas.id(ideaId);
    return res.status(200).json({ idea });
}

async function updateJarIdea(req, res, next) {
    const updateableIdeaFields = ['title', 'description', 'tags'];

    const { jarSlug, ideaId } = req.params;

    const ideaFieldsToBeUpdated = _.pick(req.body, updateableIdeaFields);

    const update = _.reduce(
        ideaFieldsToBeUpdated,
        (accum, value, key) => Object.assign(accum, { [`ideas.$.${key}`]: value }),
        {}
    );

    let updatedJar;
    try {
        updatedJar = await Jar.findOneAndUpdate(
            { slug: jarSlug, 'ideas._id': ideaId },
            update,
            { new: true }
        );
    } catch (e) {
        return res.status(500).json({ error: e });
    }

    if (!updatedJar) {
        return res.status(202).json({
            message: 'There is either no jar and idea matching the supplied slug and id, or there is no update to be made!'
        });
    }

    return res.status(200).json({ jar: updatedJar });
}

async function deleteJarIdea(req, res, next) {
    const { jarSlug, ideaId } = req.params;

    try {
        await Jar.findOneAndUpdate(
            { slug: jarSlug, 'ideas._id': ideaId },
            { $pull: { ideas: { _id: ideaId } } }
        );
        return res.status(200).json({ message: 'Success' });
    } catch (e) {
        return res.status(500).json({ error: e });
    }

}
