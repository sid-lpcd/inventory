<template>
<div>
    <Metalchemy />
    <div class="container">
    <h1 class="SelectType">Select the type:</h1>
    <select id="select" v-model="selection" class="select" @change="getType" >
        <option class="opt" value="Name">Name</option>
        <option class="opt" value="Id">Id</option>
        <option class="opt" value="Date of Entry">Date of Entry</option>
        <option class="opt" value="Hazards">Hazards</option>
    </select>
    
    <input 
        v-if="selection !='Hazards'"
        id="search_box"
        ref="input" 
        type="text" 
        :placeholder= placeholder_text
        class="search_box"
        @keyup.enter="getItem">

    <select v-if="selection =='Hazards'" id="hazard_select" v-model="selected_hazards" class="hazard_selection" multiple @change="getItem"  >
        <option v-for="(hazard,index) in hazards_list" :key="index" class="opt_haz" :value="hazard.hazardName">{{hazard.hazardName}}</option>
    </select>
    <button class="button_search" @click="getItem"></button>
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

        <div v-for="(item,index) in search_list" :key="index">
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
            visibleErr: false,
            show: false,
            selection: 'Name',
            placeholder_text: 'Enter the NAME of the Item', 
            items_list:[], 
            search_list:[],
            hazards_list:[],
            selected_hazards:[]
        }
    },
    async fetch(){
        this.hazards_list = await this.$axios.$get('http://localhost:3000/api/allhazards')

    },
    methods:{
         getType(){
            switch (this.selection) {
                case 'Name':
                    this.placeholder_text = 'Enter the NAME of the Item'
                    break
                case 'Id':
                    this.placeholder_text = 'Enter the ID of the Item'
                    break
                case 'Date of Entry':
                    this.placeholder_text = 'YYYY-MM-DD'
                    break
                case 'Hazards':
                    this.placeholder_text = 'Enter HAZARDS of the Item'
                    break
            }
            
        },
        async DeleteItem(id){
            await this.$axios.$get('http://localhost:3000/api/DeleteItemById',{ params: { searchString: id } })
        },
        async getItem(){
            const sel = this.selection
            let search =''
            if (sel !== 'Hazards') {
                search = document.getElementById('search_box').value
            }
            let startDate =''
            let endDate = ''
            if (sel === 'Date of Entry') {
                startDate = new Date(search)
                endDate = new Date(search)
                endDate.setDate(endDate.getDate() + 1)
            }
            let temp = []
            switch (sel) {
                case 'Name':     
                    temp = await this.$axios.$get('https://testsidlpcd.herokuapp.com/api/ItemByName',{ params: { searchString: search } })
                    break;
            
                case 'Id':
                    temp = await this.$axios.$get('http://localhost:3000/api/ItemById',{ params: { searchString: search } })
                    break;
                case 'Date of Entry':
                    temp = await this.$axios.$get('http://localhost:3000/api/ItemByDate',{ params: { start: startDate, end: endDate } })
                    break;
                case 'Hazards':
                    temp = await this.$axios.$get('http://localhost:3000/api/ItemByHazard',{ params: { searchString: this.selected_hazards } })
                    break;
            }
            if (!Array.isArray(temp)) {
                temp = [temp]
            }
   
    	    for( let i = 0; i <temp.length; i++ ){
                const hazArr = await this.$axios.$get('http://localhost:3000/api/HazardsInItem',{ params: { searchString: temp[i].id } })
                const hazards = {hazards: hazArr}
                Object.assign(temp[i],hazards)     
            }
            this.search_list = temp
            this.show = true
        }

    }
  }
</script>

<style scoped>
.container{
    position: relative;
    top: 40px;
}
.SelectType{
    position: absolute;
    top: 30px;
    left: 10px;
    width: 200px;
    height: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: bold;
    font-size: 18px;
    line-height: 0.6cm;
    text-align: center;

    color: #000000;

}
.select{
    position: absolute;
    top: 43px;
    left: 200px;
    width: 100px;
    height: 20px;

}
.opt{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
    text-align: center;
}
.search_box{
    position: absolute;
    left: 30px;
    top: 85px;
    width: 6.5cm;
    height: 1cm;
    
    font-family: Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 0.6cm;
    text-align: center;

    color: #000000;
}
.hazard_selection{
    position: absolute;
    left: 30px;
    top: 105px;
    width: 6.5cm;
}
.opt_haz{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.button_search{
    position: absolute;
    right: 30px;
    top: 88px;
    width: 1cm;
    height: 1cm;
    background-image: url('data:image/png;base64,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');
    background-size: 0.8cm 0.8cm;
    background-position: 0.05cm 0.05cm;
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
