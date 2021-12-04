<template>
  <div>
      <Metalchemy />
      <div class="table">
        <div class="firstRow">
            <span class="Id_F">Id</span>
            <span class="Name_F">Name</span>
            <span class="Quantity_F">Quantity</span>
            <span class="Measure_F">Measure</span>
            <span class="Entry_F">Entry Date</span>
            <span class="Updated_F">Updated At</span>
            <span class="Hazards_F">Hazards</span>
        </div>
        <div v-for="(item,index) in items_list" :key="index" class="nextRow">
            <span class="Id_N">{{item.id}}</span>
            <span class="Name_N">{{item.name}}</span>
            <span class="Quantity_N">{{item.quantity}}</span>
            <span class="Measure_N">{{item.measure}} {{item.unit}}</span>
            <span class="Entry_N">{{item.createdAt.slice(0,10)}}</span>
            <span class="Updated_N"> {{item.updatedAt.slice(0,10)}}</span>
            <div v-for="(hazard_n,index) in item.hazards" :key="index" class="Hazards_N" >
                <span class="Hazard_N">{{hazard_n.hazardName}}</span>
            </div>
            
        </div>
        
    </div>
  </div>
</template>

<script>

export default {
    data(){
        return{
            items_list: []
        }
    },
    async fetch(){
        this.items_list = await this.$axios.$get('http://localhost:3000/api/allitems')
        for( let i = 0; i <this.items_list.length; i++ ){
                const hazArr = await this.$axios.$get('http://localhost:3000/api/HazardsInItem',{ params: { searchString: this.items_list[i].id } })
                const hazards = {hazards: hazArr}
                Object.assign(this.items_list[i],hazards)     
            }
    }

}
</script>

<style>
.table{
    position: relative;
    left: 20px;
    top: 160px;
    width: 17cm;
    height: 1cm;
}
.firstRow{
    width: 17cm;
    height: 1cm;
}
.Id_F{
    position: relative;
    left: 0px;
    top: 0px;
    width: 1cm;
    height: 1cm;
    margin: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.Name_F{
    position: relative;
    left: 0.6cm;
    top: 0px;
    width: 1cm;
    height: 1cm;
    margin: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.Quantity_F{
    position: relative;
    left: 1.2cm;
    top: 0px;
    width: 1cm;
    height: 1cm;
    margin: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.Measure_F{
    position: relative;
    left: 1.6cm;
    top: 0px;
    width: 1cm;
    height: 1cm;
    margin: 0px;
    margin-left: 0px;
    margin-right: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.Entry_F{
    position: relative;
    left: 2cm;
    top: 0px;
    width: 1cm;
    height: 1cm;
    margin: 0px;
    margin-left: 0px;
    margin-right: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.Updated_F{
 position: relative;
    left: 2.4cm;
    top: 0px;
    width: 1cm;
    height: 1cm;
    margin: 0px;
    margin-left: 0px;
    margin-right: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.Hazards_F{
 position: relative;
    left: 3cm;
    top: 0px;
    width: 1cm;
    height: 1cm;
    margin: 0px;
    margin-left: 0px;
    margin-right: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
</style>