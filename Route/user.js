const express = require("express");

const route = require("express").Router();
const controller = require("../controller/user");

{
	/**
	 * @swagger
	 * /user/create:
	 *  post:
	 *      summary:
	 *      description:
	 *      tags:
	 *          - User
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
	 *                          - email
	 *                          - password
	 *                      properties:
	 *                          name:
	 *                              type: string
	 *                              required : true
	 *                          email:
	 *                              type: string
	 *                              required : true
	 *                          password:
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
    let result = await controller.registerUser(req);
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
   * /user/login:
   *  post:
   *      summary: 
   *      tags:
   *          - User
   *      consumes:
   *          - application/json
   *      parameters:
   *              -   in: body
   *                  name: body
   *                  required: true
   *                  schema:
   *                      type: object
   *                      required:
   *                          - email
   *                          - password
   *                      properties:
   *                          email:
   *                              type: string
   *                              required : true
   *                          password:
   *                              type: string
   *                              required : true
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

route.post("/login", async(req,res)=>{
      let result = await controller.login(req);
      if (result.failed) {
          res.status(result.status).send({
              msg: result.msg
          });
          return;
      } else {
        res.status(result.status).send({
          token: result.token,
          user:result.user,
          msg:result.msg,
          status:result.status,
      });
          return 
      }
  }
)


module.exports = route;
