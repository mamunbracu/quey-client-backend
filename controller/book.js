
const Book = require("../models/Book");

module.exports.create_book = async (req) => {

	try {
		const book = await new Book(req.body);
		await book.save();
		return {
			success: true,
			status: 201,
			msg: "Book created Successfully",
      book:book
		};
	} catch (error) {
		console.log(error);
		return {
			failed: true,
			status: 400,
			msg: "Book creation failed",
      book:book
		};
	}
};


module.exports.get_book = async req => {
  let filter = req.query.filter;
  try {
    const data = await Book.find(
      {
        $and: [
          {
            $or: [
              {
                ...filter && {
                  name: new RegExp(filter, "i"),
                },
              },
              {
                ...filter && {
                  description: new RegExp(filter, "i"),
                },
              },
              {
                ...filter && {
                  author: new RegExp(filter, "i"),
                },
              },
            ],
          },
        ],
      },
    )
 console.log("data", data);
      return {
        msg:"book found successfully",
        status:200,
        data
      };
  } catch (error) {
    console.log(error);
      return {
          failed: true,
          status: 400,
          msg: "Failed to fetch"
      }
  }
}



module.exports.edit = async req => {
  let data = req.body;
  try {
      await Book.updateOne({
          _id: data.id
      }, {
          $set: data
      });
      return {
        msg:"Updated successfully",
        data
      };
  } catch (error) {
      return {
          failed: true,
          status: 400,
          msg: "Book update failed"
      }
  }
}
module.exports.getSingleBook = async req => {
  
 const {id} = req.query
  try {
    const book = await Book.findById(req.query);
      return {
        msg:`Book found with this id`,
        book
      };
  } catch (error) {
      return {
          failed: true,
          status: 400,
          msg: "Book not found"
      }
  }
}



module.exports.delete = async req => {
  let {
      _id
  } = req.query;
  try {
      await Book.deleteOne({
          _id
      });
      return {
        msg:"Book deleted successfully"
      };
  } catch (error) {
      return {
          failed: true,
          status: 400,
          msg: "Delete failed"
      }
  }
}