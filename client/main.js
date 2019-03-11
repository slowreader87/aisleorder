import './main.html';
import React from 'react';
import ReactDOM from 'react-dom';
import meteor from 'meteor/meteor';
import { ShoppingList } from './../imports/api/ShoppingList';
import { Tracker } from 'meteor/tracker';


const handleSubmit = function (e) {
e.preventDefault();
// REMOVE OLD COMMENTS FROM HERE AND SAVE
// set up a readme.md explaining the application

item = e.target.listItem.value.trim(); // grab the list item and trim any white space

let last = ShoppingList.findOne({}, {sort:{createdAt:-1}}) // return the latest document/row from the db

if (item.length == 0) // if the user entered no item
{
  ShoppingList.remove(last._id); // remove the last added item
}
else // if there is an item in the text box form field update the document with it
{
ShoppingList.update(last._id, {$set: {item: item}}); // Uses the shorter syntax where only the doc id forms 1st argument
e.target.listItem.value = ''; // reset the comment box back to blank after use.
}

// let quantity = e.target.quantityBox.value;
//
// if (quantity){
//   ShoppingList.update(last._id, {$set: {quantity: quantity}});
//   e.target.quantityBox.value = '';
// }

};

const renderItems = function(shoppingList){
  return shoppingList.map(function(item, index, sourceArray){ // left i and src here as you could use them if you wanted to access the iteration e.g.
    // to compare current item with the next item. src is the source array  so src[i] gives you item.

let color ="";

switch (item.Aisle)
{
  case "Fruit & Veg":
  color = "colorFruitandVeg"
  break;

  case "Dairy":
  color = "colorDairy"
  break;

  case "Meat & Fish":
  color = "colorMeatandFish"
  break;

  case "Ready Meals":
  color = "colorReadyMeals"
  break;

  case "Hams and Dips":
  color = "colorHamsandDips"
  break;

  case "Counter":
  color = "colorCounter"
  break;

  case "Dry":
  color = "colorDry"
  break;

  case "Household":
  color = "colorHousehold"
  break;

  case "Breads":
  color = "colorBread"
  break;

  case "Baking":
  color = "colorBaking"
  break;

  case "Frozen":
  color = "colorFrozen"
  break;

  case "M & S":
  color = "colorMandS"
  break;

  case "Baby":
  color = "colorBaby"
  break;

  case "Boots":
  color = "colorBootsItem"
  break;

  case "Wilko":
  color = "colorWilko"
  break;

  case "Top":
  color = "colorTop"
  break;
}

// to place a strike through purchased items. "Got" button demotes their sort order by 50. if this occurs the strikethrough style is added
let strikethrough = "";

if (item.AisleId > 50) {
    strikethrough = " strikethrough"; // leading space needed
}

// This is a bodge to correct any multiple "got" clicks. i.e. limit their ability to accumulate increments or decrements to the aisle ID.
// I was looking for a way to toggle add 50 or remove 50 e.g. with a checkbox state but could only manage to get it to add and keep adding
// so converted to two buttons "Got" and "Re-Add". Sorry!

if (item.AisleId >= 100) {
  ShoppingList.update(item._id, {$inc: {AisleId: -50}})
}
else if (item.AisleId <= 0) {
  ShoppingList.update(item._id, {$inc: {AisleId: 50}})
}

let previousIndex = index-1;
let current = sourceArray[index].AisleId;

let previous = 0;
if (previousIndex >=0) {
previous = sourceArray[previousIndex].AisleId;
}

if (current - previous >=29)
{
  return (

<div>
  <div className="div-divide"></div>
      <p key={item._id} className={"listItem" + " " + color + strikethrough}>
        {item.item}
        <button name="got" className="itemButton"
          onClick={()=>
            ShoppingList.update(item._id, {$inc: {AisleId: 50}})
          }>Got</button>
          <button name="re-add" className="itemButton"
            onClick={()=>
              ShoppingList.update(item._id, {$inc: {AisleId: -50}})
            }>Re-Add</button>
        <button name="remove" className="itemButton removeButton"
          onClick={() => ShoppingList.remove(item._id)}>X</button></p>
</div>
    ) // changed to shorthand for removal targeting by id, in each instance
}
else {
return (
    <p key={item._id} className={"listItem" + " " + color + strikethrough}>
      {item.item}
      <button name="got" className="itemButton"
        onClick={()=>
          ShoppingList.update(item._id, {$inc: {AisleId: 50}})
        }>Got</button>
        <button name="re-add" className="itemButton"
          onClick={()=>
            ShoppingList.update(item._id, {$inc: {AisleId: -50}})
          }>Re-Add</button>
      <button name="remove" className="itemButton removeButton"
        onClick={() => ShoppingList.remove(item._id)}>X</button></p> // changed to shorthand for removal targeting by id, in each instance
  )
}
  });
}

Meteor.startup(function(){
  Tracker.autorun(function() {
const items = ShoppingList.find({}, {sort: {AisleId:1}, limit:100}).fetch(); // limit is in here for illustrative purposes. Was useful for e-Time
  let title = 'Aisle Order';
  let name = 'your list';
  let jsx = (
    <div className="wrapper">
      <div className="title-bar">
        <h1>{title}</h1>
        <p className="tagline">Welcome to {name}</p>
        <p className="instruction"> Add an item and then tap an aisle</p>
      </div>

      <div className="buttonsDiv">
      <form onSubmit={handleSubmit} className="form">
        <input type="text" className="textBox" name="listItem" placeholder="Enter list item"/>
        {/* <input type="text" className="listItem quantityBox" name="quantityBox" placeholder="quantity"/> */}
        <br></br><button className="button colorFruitandVeg"
          onClick={() => ShoppingList.insert({Aisle: 'Fruit & Veg', AisleId: 11, createdAt: new Date()})}>
          Fruit & Veg</button>
        <button className="button colorDairy"
          onClick={() => ShoppingList.insert({Aisle: 'Dairy', AisleId: 12, createdAt: new Date()})}>
          Dairy</button>
        <button className="button colorMeatandFish"
            onClick={() => ShoppingList.insert({Aisle: 'Meat & Fish', AisleId: 13, createdAt: new Date()})}>
            Meat & Fish</button>
        <button className="button colorReadyMeals"
            onClick={() => ShoppingList.insert({Aisle: 'Ready Meals', AisleId: 14, createdAt: new Date()})}>
            Ready Meals</button>
        <br></br>
        <button className="button colorHamsandDips"
                onClick={() => ShoppingList.insert({Aisle: 'Hams and Dips', AisleId: 15, createdAt: new Date()})}>
                Hams & Dips</button>
        <button className="button colorCounter"
                onClick={() => ShoppingList.insert({Aisle: 'Counter', AisleId: 16, createdAt: new Date()})}>
                Counter</button>
        <button className="button colorDry"
                onClick={() => ShoppingList.insert({Aisle: 'Dry', AisleId: 17, createdAt: new Date()})}>
                Dry</button>
        <button className="button colorHousehold"
                onClick={() => ShoppingList.insert({Aisle: 'Household', AisleId: 18, createdAt: new Date()})}>
                Household</button>
        <br></br>
        <button className="button colorBread"
                onClick={() => ShoppingList.insert({Aisle: 'Breads', AisleId: 19, createdAt: new Date()})}>
                Breads</button>
        <button className="button colorBaking"
                onClick={() => ShoppingList.insert({Aisle: 'Baking', AisleId: 20, createdAt: new Date()})}>
                Baking</button>
        <button className="button colorFrozen"
                onClick={() => ShoppingList.insert({Aisle: 'Frozen', AisleId: 21, createdAt: new Date()})}>
                Frozen</button>
        <button className="button colorBaby"
                onClick={() => ShoppingList.insert({Aisle: 'Baby', AisleId: 22, createdAt: new Date()})}>
                Baby</button>
	<br></br>
        <button className="button colorMandS"
                onClick={() => ShoppingList.insert({Aisle: 'M & S', AisleId: 7, createdAt: new Date()})}>
                M & S</button>
        <button className="button colorBoots"
                onClick={() => ShoppingList.insert({Aisle: 'Boots', AisleId: 8, createdAt: new Date()})}>
                Boots</button>
        <button className="button colorWilko"
                onClick={() => ShoppingList.insert({Aisle: 'Wilko', AisleId: 9, createdAt: new Date()})}>
                Wilko</button>
        <button className="button colorTop"
                onClick={() => ShoppingList.insert({Aisle: 'Top', AisleId: 1, createdAt: new Date()})}>
                *Top*</button>

      </form>
    </div>
        {renderItems(items)}
    </div>
  );

  ReactDOM.render(jsx, document.getElementById('app'))

  });
});
