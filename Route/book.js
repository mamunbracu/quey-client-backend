const express = require("express");
const route = require("express").Router();
const controller = require("../controller/book");
const { protect } = require("../middleware/authMiddleware");

{
	/**
	 * @swagger
	 * /book/create:
	 *  post:
	 *      summary:
	 *      description:
	 *      tags:
	 *          - Book
	 *      consumes:
	 *          - application/json
	 *      parameters:
	 *              -   in: body
	 *                  name: body
	 *                  required: true
	 *                  schema:
	 *                      type: object
	 *                      required:
	 *                          - name
	 *                          - author
	 *                          - description
	 *                      properties:
	 *                          name:
	 *                              type: string
	 *                              required : true
	 *                          author:
	 *                              type: string
	 *                              required : true
	 *                          description:
	 *                              type: string
	 *                              required : true
	 *      responses:
	 *          200:
	 *              description: success
	 *          400:
	 *              description: Error
	 *          401:
	 *              description: Unauthorized
	 *
	 */
}

route.post("/create", async (req, res) => {
  try {
    let result = await controller.create_book(req);
    if (result.failed) {
      res.status(result.status).send({
        msg: result.msg,
      });
      return;
    } else {
      res.send(result);
      return;
    }
  } catch (error) {
    console.log(error);
  }

});





{
  /**
   * @swagger
   * /book/edit:
   *  put:
   *      summary: 
   *      tags:
   *          - Book
   *      consumes:
   *          - application/json
   *      parameters:
   *              -   in: body
   *                  name: body
   *                  required: true
   *                  schema:
   *                      type: object
   *                      required:
   *                          - id
   *                      properties:
   *                          id:
   *                              type: string
   *                          name:
   *                              type: string
   *                          author:
   *                              type: string
   *                          description:
   *                              type: string
   *      responses:
   *          200:
   *              description: success
   *          400:
   *              description: Error
   *          401:
   *              description: Unauthorize
   *    
   */
}

route.put("/edit", async (req, res) => {
  let result = await controller.edit(req);
  if (result.failed) {
      res.status(result.status).send({
          msg: result.msg
      });
      return;
  } else {
      res.send(result);
      return;
  }
})


{
  /**
   * @swagger
   * /book/getAll:
   *  get:
   *      description:
   *      tags:
   *          - Book
   *      parameters:
   *              -   in: query
   *                  name: filter
   *                  schema:
   *                      type: string
   *      responses:
   *          200:
   *              description: successful
   *          201:
   *              description: Created
   *          400:
   *              description: Bad Request
   */
}



route.get("/getAll",
  async (req, res) => {
      let result = await controller.get_book(req);
      console.log(result.data);
      if (result.failed) {
          res.status(result.status).send({
              msg: result.msg
          });
          return;
      } else {
        res.send({success : "yes",data:result.data});
        return;
      }
  }
);



{
  /**
   * @swagger
   * /book/getSingle:
   *  get:
   *      description: search a book by id
   *      tags:
   *          - Book
   *      parameters:
   *              -   in: query
   *                  name: _id
   *                  schema:
   *                      type: string
   *      responses:
   *          200:
   *              description: successful
   */
}
route.get("/getSingle",
  async (req,res)=>{
      let result = await controller.getSingleBook(req);
      if (result.failed) {
          res.status(result.status).send({
              msg: result.msg
          });
          return;
      } else {
          res.send({msg: result.msg, result});
          return;
      }
  }
)

{
  /**
   * @swagger
   * /book/delete:
   *  delete:
   *      description: 
   *      tags:
   *          - Book
   *      parameters:
   *              -   in: query
   *                  name: _id
   *                  schema:
   *                      type: string
   *      responses:
   *          200:
   *              description: successful
   */
}

route.delete("/delete",
  async (req,res)=>{
      let result = await controller.delete(req);
      if (result.failed) {
          res.status(result.status).send({
              msg: result.msg
          });
          return;
      } else {
          res.send(result);
          return;
      }
  }
)





module.exports = route;
