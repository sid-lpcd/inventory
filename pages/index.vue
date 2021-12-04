<template>
  <div class="container">
    <Metalchemy />
    <div class="Text_Container">
      <p class="text">This web-app allows you to track your inventory. You are able to: </p>
      <p class="bullet"> - Add a new item to the database by uploading a photo of it. The program will identify the information to be saved;</p>
      <p class="bullet2"> - Add manually a new hazard and connect it to items; <p/>
      <p class="bullet3"> - See the full inventory or search by specific elements.</p>
    </div>
    <div class="button_grid">
      <div class="but_gr">
        <div class="button_cont">
          <NuxtLink to="/items" from="/" class="button_main">
            <img class="img_items" src="../assets/imgs/list.png" alt="">
          </NuxtLink>
          <p class="text_bt">All Items</p>
        </div>
        <div class="button_cont">
          <NuxtLink to="/add_hazard" from="/" class="button_main">
            <img class="img_haz" src="../assets/imgs/Hazards.png" alt="">        
          </NuxtLink>
          <p class="text_bt">Add New Hazard</p>
        </div>
        
      </div>
     <div class="but_gr">
       <div class="button_cont">
        <NuxtLink to="/search_item" from="/" class="button_main">
          <img class="img_search" src="../assets/imgs/search.png" alt=""> 
        </NuxtLink>
        <p class="text_bt">Search Item</p>
       </div>
       <div class="button_cont">
        <NuxtLink to="/add_items" from="/" class="button_main">
          <img class="img_add" src="../assets/imgs/Plus.png" alt="">
        </NuxtLink>
        <p class="text_bt">Add New Item</p>
       </div>
        
      </div>
    </div>
    <bottom />
  </div>
</template>

<script>
import bottom from '../components/bottom.vue'
export default {
  components: { bottom },}
</script>

<style >
.Text_Container{
  position: absolute;
  top: 70px;
  left: 20px;
  width: 9cm;
}
.text{
  font-family: Metalchemy-reg;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 0.6cm;
  text-align: justify;
}
.bullet{
  position: relative;
  top: -10px;
  font-family: Metalchemy-reg;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 0.6cm;
  text-align: justify;
}
.bullet2{
  position: relative;
  top: -20px;
  font-family: Metalchemy-reg;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 0.6cm;
  text-align: justify;
}
.bullet3{
  position: relative;
  top: -30px;
  font-family: Metalchemy-reg;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 0.6cm;
  text-align: justify;
}
.button_grid{
  padding: 9cm 30px;
  display: grid;
  column-gap: 60px;
  row-gap: 20px;
  grid-template-columns: 1fr;
  height: 5cm;
  width: 10cm;
}
.but_gr{
position: relative;
display: flex;
flex-direction: row;
column-gap: 50px
}
.button_cont{
  width: 4cm;
  height: 4cm;
}
.text_bt{
  position: relative;
  width: 2.3cm;
  height: 1cm;
  bottom: 0px;
  left: 0px;
  font-family: Metalchemy-reg;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 0.6cm;
  text-align: center;
}
.button_main{
  width: 2.3cm;
  height: 2.3cm;
  background-color: #c2fbd7;
  border-radius: 5px;
  box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;

  font-family: Metalchemy-reg;
  font-style: normal;

  font-size: 18px;
  line-height: 1.8cm;
  text-align: center;

  transition: all 250ms;
  border: 0;
  touch-action: manipulation;
}
.button:hover {
  box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}
.img_items{
  position: relative;
  width: 2cm;
  height: 2cm;
  top: 5px;
}
.img_search{
  position: relative;
  width: 2cm;
  height: 2cm;
  top: 5px;
}
.img_add{
  position: relative;
  width: 2cm;
  height: 2cm;
  top: 5px;
}
.img_haz{
  position: relative;
  width: 2cm;
  height: 2cm;
  top: 5px;
}
</style>

