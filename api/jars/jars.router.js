const router = require('express').Router();
const jarsCtrl = require('./jars.controller');

router.get('/', jarsCtrl.listJars);
router.post('/', jarsCtrl.createJar);

router.get('/:jarSlug', jarsCtrl.getJar);
router.put('/:jarSlug', jarsCtrl.updateJar);
router.delete('/:jarSlug', jarsCtrl.deleteJar);

router.get('/:jarSlug/ideas', jarsCtrl.listJarIdeas);
router.post('/:jarSlug/ideas', jarsCtrl.createJarIdea);

router.get('/:jarSlug/ideas/:ideaId', jarsCtrl.getJarIdea);
router.put('/:jarSlug/ideas/:ideaId', jarsCtrl.updateJarIdea);
router.delete('/:jarSlug/ideas/:ideaId', jarsCtrl.deleteJarIdea);


module.exports = router;
