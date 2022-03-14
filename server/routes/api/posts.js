const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//GET
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//ADD
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
  });
  res.status(201).send();
});

//DELETE
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send();
})

//Connect to DB
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://User:User123@webshopcluster.xtdrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  return client.db("webshopcluster").collection("posts");
}
//Export router
module.exports = router;
