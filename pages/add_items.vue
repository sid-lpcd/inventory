<template>
<div>
<input type="text" id="Name">
<input type="text" id="Quantity">
<input type="text" id="Volume">
<input type="text" id="Unit">
<input type="text" id="Hazards">
<button @click.native="Upload" class="button"></button>
</div>
</template>

<script>


  export default {
    data(){
        return{
            items_list:[],
            hazard_list:[]
        }
    },
    async fetch(){
        this.items_list = await this.$axios.$post('http://localhost:3000/api/item',{
            name: 'Test', 
            quantity: Number(1),
            volume: Number(100),
            unit: 'ml',
        }
        )
        console.log(this.items_list)
        this.hazard_list = await this.$axios.$post('http://localhost:3000/api/hazard',{
            hazard:'Flam'
        }
        )
      
    },
        

  }
</script>

<style >
.button{
    width: 2cm;
    height: 2cm;
}

</style>