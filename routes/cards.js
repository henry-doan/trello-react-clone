'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Card = require('../models/card');

router.get('/', (req, res) => {
	let query = Card.find({});
	query.where('listId', req.query.listId);
	query.find( ( err, boards ) => {
		res.json(cards);
	});
});

router.post('/', (req, res) => {
	let { name, description, listId } = req.body;
	new Card({
		name,
		description,
		listId
	}).save( (err, card) => {
		res.json(card);
	});
});

router.put('/:id', ( req, res ) => {
	let { name, description } = req.body;
	Card.findByIdAndUpdate(
		req.params.id,
		{ $set: { name, description }},
		(err, card) => {
			res.json(card);
	});
});

router.delete('/:id', (req, res) => {
 Card.findById(req.params.id, (err, card) => {
  card.remove();
	res.status(200).send({success: true});
 });
});

module.exports = router;