<template>
<div>
    <Metalchemy />
    <div class="input_container">
        <p>Last or All</p>
        <input id="Type" type="text" >
        <p>Item Name</p>
        <input id="ItemName" type="text" >
        <p>Hazard Name</p>
        <input id="HazardName" type="text" >
        <button class="button" @click="upload" ></button>
    </div>
    
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

        <div v-for="(item,index) in items_list" :key="index">
            <span v-if="show" class="nextRow">
                <span class="Id_N">{{item.id}}</span>
                <span class="Name_N">{{item.name}}</span>
                <span class="Quantity_N">{{item.quantity}}</span>
                <span class="Measure_N">{{item.measure}} {{item.unit}}</span>
                <span class="Entry_N">{{item.createdAt.slice(0,10)}}</span>
                <span class="Updated_N"> {{item.updatedAt.slice(0,10)}}</span>
                <span class="Hazards_N">
                    <span v-for="(hazard_n,index2) in item.hazards" :key="index2" class="Hazard_list">  {{hazard_n.hazardName}}; </span>
                </span>  
            </span>
        </div>
    </div>
</div>
</template>

<script>


  export default {
    data(){
        return{
            show: false,
            items_list:[],
            hazard_list:[]
        }
    },
    methods:{
        async upload(){
            let temp = []
            temp = await this.$axios.$post('http://localhost:3000/api/hazard',{
                type: document.getElementById('Type').value,
                name: document.getElementById('ItemName').value,
                hazard:document.getElementById('HazardName').value
            })
            if (!Array.isArray(temp)) {
                temp = [temp]
            }
            for( let i = 0; i <temp.length; i++ ){
                const hazArr = await this.$axios.$get('http://localhost:3000/api/HazardsInItem',{ params: { searchString: temp[i].id } })
                const hazards = {hazards: hazArr}
                Object.assign(temp[i],hazards)     
            }
            this.items_list = temp
            this.show = true
        }
    }
        

  }
</script>

<style >
.input_container{
    position: relative;
    top: 100px;
}
.button{
    width: 2cm;
    height: 2cm;
}
.table{
    position: relative;
    left: 20px;
    top: 160px;
    width: 17cm;
    height: 1cm;
    display: grid;
    row-gap: 0px;
}
.firstRow{
    display: flex;
    flex-direction: row;
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
    width: 1.2cm;
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
    width: 1.5cm;
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
    width: 1.5cm;
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
    width: 2.5cm;
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
    width: 2.5cm;
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
    width: 1.5cm;
    height: 1cm;
    margin: 0px;
    margin-left: 0px;
    margin-right: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.nextRow{
    border: 1pt solid black;
    display: flex;
    flex-direction: row;
    min-height: 17px;
}
.Id_N{
    position: relative;
    left: 0px;
    top: 2px;
    width: 1cm;
    margin: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
}
.Name_N{
    position: relative;
    left: 0.6cm;
    top: 2px;
    width: 1.2cm;
    margin: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
}
.Quantity_N{
    position: relative;
    left: 1.2cm;
    top: 2px;
    width: 1.5cm;
    margin: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
}
.Measure_N{
    position: relative;
    left: 1.6cm;
    top: 2px;
    width: 1.5cm;
    margin: 0px;
    margin-left: 0px;
    margin-right: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
}
.Entry_N{
    position: relative;
    left: 2cm;
    top: 2px;
    width: 2.5cm;
    margin: 0px;
    margin-left: 0px;
    margin-right: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
}
.Updated_N{
 position: relative;
    left: 2.4cm;
    top: 2px;
    width: 2.5cm;
    margin: 0px;
    margin-left: 0px;
    margin-right: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
}
.Hazards_N{
 position: relative;
    left: 3cm;
    top: 2px;
    width: 1.5cm;
    margin: 0px;
    margin-left: 0px;
    margin-right: 0px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
    display: flex;
}
.Hazards_list{
    position: relative;

}

</style>