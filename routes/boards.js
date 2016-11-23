'use strict';

const express = require('express');
const router = express.Router();
const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');

router.get('/', (req, res) => {
	Board.find( ( err, boards ) => {
		res.json(boards);
	});
});

router.get('/:id', function(req, res, next) {
   res.render('board');
});

router.post('/', (req, res) => {
	new Board({
		name: req.body.name
	}).save( (err, board) => {
		res.json(board);
	});
});

router.put('/:id', ( req, res ) => {
	let { name, description } = req.body;
	Board.findByIdAndUpdate(
	req.params.id,
	{ $set: { name, description }},
	{ new: true },
	(err, board) => {
		res.json(board);
	});
});

router.delete('/:id', (req, res) => {
 let boardId = req.params.id
 Board.findById(boardId, (err, board) => {
   board.remove();
   List.find({ boardId }, ( err, lists) => {
     lists.forEach( ( err, index) => {
       let list = lists[index];
       Card.find({'listId': list._id}).remove().exec();
       list.remove();
     });
     res.status(200).send({success: true});
   });
 });
}); 

module.exports = router;