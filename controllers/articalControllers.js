const Artical = require('../models/artical')
const schedule = require('node-schedule');

// Get All Elemnts of artical
const getAllElement=async function(req,res){
    Artical.find({}).then ((articale) =>{
        res.status(200).send(articale)
    }).catch((e) => {
        res.status(500).send(e)
    })
}
// Get artical by id

const getElmenetById= async function(req,res){
    const _id = req.params.id
    Artical.findById(_id).then ((artical) => {
        if(!artical){
          return  res.status(404).send('UNABLE TO FIND')
        }
        res.status(200).send(artical)
      }).catch ((e) => {
        res.status(500).send(e)
      })
}

// add new artical

const addNewِArtical = async function(req,res){
    // console.log(req.body)
    const artical = new Artical (req.body,{ isDraft: false })
    artical.save()
    .then ((articals) => {res.status(200).json({ message: 'Article published successfully', articals})})
    .catch((e)=>{ res.status(400).send(e)})
}

//update artical by id

const updateArticalById =async function(req,res){
  try {
      const _id = req.params.id 
      const artical = await Artical.findByIdAndUpdate (_id , req.body , {
         new : true,
         runValidators : true
      })
      if(!artical) {
         return res.status(404).send('No User Founded')
      }
      res.status(200).send(artical)
   }
   catch(error) {
      res.status(400).send(error)
   }
}

// delete article by id
const deletById = async function(req,res){
  try {
      const _id = req.params.id
      const artical = await Artical.findByIdAndDelete(_id)
      if(!artical) {
         return res.status(404).send('UNABLE TO FIND USER')
      }
      res.status(200).send(artical)
 }
 catch(e){
     res.status(400).send(e)
 }
}
//   creat article as draft
const draft =async (req, res) => {
// console.log(req.body)
  const artical = new Artical (req.body,{ isDraft: true })
  artical.save()
  .then ((articals) => {res.status(200).json({ message: 'Article Saved as Draft', articals})})
  .catch((e)=>{ res.status(400).send(e)})
}

// edit-draft arical by id

const updateDraftArticalById =async function(req,res){

    try {
        const _id = req.params.id 
        const artical = await Artical.findByIdAndUpdate (_id , req.body , {
           new : true,
           runValidators : true
        })
        if(!artical) {
           return res.status(404).send('No User Founded')
        }
        res.status(200).send(artical)
     }
     catch(error) {
        res.status(400).send(error)
     }
}

// make a post as preview
const preview = async function(req,res){
    const articleId = req.params.id;
    const artical = Artical[articleId];
    if (!artical) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article preview', artical });
}
const moveArticalToTrash= async (req, res) => {
  try {
    const { articalId } = req.params;
    // Find the article by ID
    const artical= await Artical.findById(articalId);

    if (!artical) {
      return res.status(404).send('Article not found');
    }

    // Move the article to the trash
    artical.isTrashed = true;
    artical.deletedAt = new Date();
    // artical.isDraft= true;
    await artical.save();
    // Schedule deletion after 30 days
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 30); // Add 30 days
    schedule.scheduleJob(deletionDate, async () => {
      try {
        await Artical.findByIdAndDelete(articalId);
        console.log(`Article deleted from trash after 30 days: ${articalId}`);
      } catch (error) {
        console.error('Error deleting article from trash:', error);
      }
    });

    res.status(200).json({ message: 'Article moved to trash successfully' });
  } catch (error) {
    console.error('Error moving article to trash:', error);
    res.status(500).send(error);
  }
};
module.exports = {
    getAllElement,
    draft,
    addNewِArtical,
    getElmenetById,
    updateArticalById,
    deletById,
    preview,
    updateDraftArticalById,
    moveArticalToTrash
}