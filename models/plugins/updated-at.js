module.exports = (schema) => {
    schema.pre('save', saveHook);
    schema.pre('findOneAndUpdate', updateHook);
    schema.pre('update', updateHook);
};

function saveHook(next) {
    const self = this;
    if (!!self.constructor.schema.paths.updated_at) {
        self.updatedAt = new Date();
    }
    return next();
}

function updateHook(next) {
    const self = this;
    if (self.options.upsert) {
        return next();
    }
    if (!!self.schema.paths.updated_at) {
        self._update.updated_at = new Date();
    }
    return next();
}
