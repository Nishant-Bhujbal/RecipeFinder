import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo/logo.png'

const RecipeListContainer = styled.div`
display : flex;
flex-direction : row;
padding : 30px;
justify-content : space-evenly;
flex-wrap : wrap;
gap : 20px;
`;

const RecipeContainer = styled.div`
display :flex;
flex-direction : column;
padding : 30px;
width : 300px;
box-shadow : 0 3px 10px 0 #aaa;
`;

const CoverImage = styled.img`
height : 200px;
`;

const RecipeName = styled.span`
font-size : 18px;
font-weight : bold;
color : black;
margin : 10px 0;

`;
const Ingredients = styled.span`
font-size : 18px;
border : solid 1px #eb3300;
color : black;
cursor: pointer;
padding : 10px 15px;
border-radius : 4px;
color : green;
text-align : center;
margin-bottom : 12px;
`;
const SeeMore = styled.span`
font-size : 18px;
border : solid 1px green;
color : black;
cursor: pointer;
padding : 10px 15px;
border-radius : 4px;
color : red;
text-align : center;

`;


function Card() {
  return (
    <RecipeListContainer>
        <RecipeContainer>
      <CoverImage src={logo}/>
      <RecipeName>Matar panner</RecipeName>
      <Ingredients>Matar panner</Ingredients>
      <SeeMore>Matar panner</SeeMore>
        </RecipeContainer>
    </RecipeListContainer>
  )
}

export default Card
