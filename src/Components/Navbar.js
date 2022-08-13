
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Axios from 'axios'
import styled from 'styled-components'
import logo from '../assets/logo/logo.png'
import searchicon from '../assets/logo/search.png'

const API_ID = "01025b7b"
const API_KEY = "6cb793b6764554b17ad5c11b6d254263"

const Container = styled.div`
display : flex;
flex-direction : column;
`;

const Header = styled.div`
color : white;
background-color : lightgray;
display : flex;
flex-direction : row;
justify-content : space-between;
align-items : center;
padding : 10px;
font-size : 25px;
font-weight : bold;
box-shadow : 0 3px 6px 0 #555;
`;

const Namecomponent = styled.div``;
const SeacrhCompnent = styled.div`
display : flex;
flex-direction : row;
background-color : white;
padding : 10px;
border-radius : 6px;
width : 50%;
`;


const SearchInput = styled.input`
border: none;
outline: none;
margin-left : 15px;
font-size : 16px;
font-weight : bold;
`;


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
object-fit:cover;
`;

const RecipeName = styled.span`
font-size : 18px;
font-weight : bold;
color : black;
margin : 10px 0;
text-align:center;

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

const Placeholder = styled.img`
    width : 300px;
    /* height : 120px; */
    margin : 200px;
    opacity : 50%;
`;

const RecipeComponent = (props)=>{
    const [show, setshow] = React.useState(false);
    const {recipeobj} = props;
    
    return(
        <>
        <Dialog open={show}>
       <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{recipeobj.label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {recipeobj.ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
       <DialogActions>
          <Ingredients onClick={()=>{
            window.open(recipeobj.url)
          }}>See More</Ingredients>
          <Ingredients onClick={()=>
                setshow("")}>
            Close
          </Ingredients>
        </DialogActions>
        
        </Dialog>
        <RecipeContainer>
            <CoverImage src={recipeobj.image} />
            <RecipeName>{recipeobj.label}</RecipeName>
            <Ingredients onClick={()=>{
                setshow(true);
            }}>Ingredients</Ingredients>
            <SeeMore onClick={()=>{
                window.open(recipeobj.url)
            }}>See Complete Recipe</SeeMore> 
        </RecipeContainer>
        </>
    );
};


function Navbar() {
    const [timeoutid, Settimeoutid] = useState();
    const [recipeList, SetrecipeList] = useState([]);

    const fetchRecipe =async(searchstring) => {
        const response = await Axios.get(`https://api.edamam.com/search?q=${searchstring}&app_id=${API_ID}&app_key=${API_KEY}`)
        SetrecipeList(response.data.hits)
        console.log(response)
    }

    const onTextChange = (event) => {
        clearTimeout(timeoutid);
        const timeout = setTimeout(() => {
            fetchRecipe(event.target.value);
        }, 500);
        Settimeoutid(timeout)
    };

    return (
        <div>
            <Container>
                <Header>
                    <Namecomponent>
                        <img src={logo} alt='logo' style={{ height: '50px', width: '100px' }} />
                    </Namecomponent>
                    <SeacrhCompnent>
                        <img src={searchicon} alt='srch' style={{ height: '20px', width: '20px' }} />
                        <SearchInput placeholder='Search Recipe' onChange={onTextChange} />
                    </SeacrhCompnent>
                </Header>
            </Container>
                <RecipeListContainer>
                    {recipeList.length ? recipeList.map((recipeobject)=>(
                        <RecipeComponent recipeobj={recipeobject.recipe}/>
                    )): <Placeholder src={logo}/>}
                
            </RecipeListContainer>

        </div>
    )
}

export default Navbar
