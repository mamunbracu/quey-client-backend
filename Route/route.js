const express = require("express");
const route = require("express").Router();
route.use(
	express.urlencoded({
		extended: true,
	})
);
route.use(express.json());

const userRoute = require("./user");
route.use("/user", userRoute);

const bookRoute = require("./book");
route.use("/book", bookRoute);

module.exports = route;
