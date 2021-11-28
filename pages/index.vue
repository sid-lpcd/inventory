<template>
  <div class="container">
    <NuxtLink to="/items" from="/" class="button3">
      <span class="text">items</span>
    </NuxtLink>
    <NuxtLink to="/add_hazard" from="/" class="button2">
      <span class="text">add hazard</span>
    </NuxtLink>
    <NuxtLink to="/search_item" from="/" class="button">
      <span class="text">search</span>
    </NuxtLink>
    <NuxtLink to="/add_items" from="/" class="button4">
      <span class="text">add item</span>
    </NuxtLink>
  </div>
</template>

<script>
export default {}
</script>

<style >
.button{
          position: absolute;
      left: 145px;
      top: 10px;
      width: 2cm;
      height: 2cm;

      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 1.8cm;
      text-align: center;

      display: inline-block;
      border: 2px solid #d25ded;
      border-radius: 4cm;
      cursor: pointer;
      transition: 0.3s ease all;

      color: #ffffff;
      background: #b58abe80;

      }
  .button2{
      position: absolute;
      left: 145px;
      top: 100px;
      width: 3cm;
      height: 2cm;

      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 1.8cm;
      text-align: center;

      display: inline-block;
      border: 2px solid #d25ded;
      border-radius: 4cm;
      cursor: pointer;
      transition: 0.3s ease all;

      color: #ffffff;
      background: #b58abe80;

  }
  .button3{
      position: absolute;
      left: 145px;
      top: 200px;
      width: 2cm;
      height: 2cm;

      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 1.8cm;
      text-align: center;

      display: inline-block;
      border: 2px solid #d25ded;
      border-radius: 4cm;
      cursor: pointer;
      transition: 0.3s ease all;

      color: #ffffff;
      background: #b58abe80;
  }
    .button4{
      position: absolute;
      left: 145px;
      top: 300px;
      width: 2cm;
      height: 2cm;

      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 1.8cm;
      text-align: center;

      display: inline-block;
      border: 2px solid #d25ded;
      border-radius: 4cm;
      cursor: pointer;
      transition: 0.3s ease all;

      color: #ffffff;
      background: #b58abe80;
  }
</style>

