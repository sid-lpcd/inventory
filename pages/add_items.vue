<template>
<div>
    <Metalchemy />
    <div class="input_container">
        <input type="file" class="file" @change="onFileChanged" >
        <button class="upload" @click="onUpload" >Upload</button>
        <div v-if="show1" class="Input_container">
            <div >
                <span class="Name">{{datal[2]}}</span>
                <span class="Measure"> {{datal[0]}} {{datal[1]}}</span>
                <span class="control_quantity">
                    <span class="quant">Quantity: </span>
                    <button class="less" @click="decrease">
                        <span class="minus">-</span>
                    </button>
                    <span class="number">{{ quantity }}</span>
                    <button class="more" @click="increase">
                        <span class="plus">+</span>
                    </button>
                </span>
            </div>
            
            <span v-for="(hazard_n,index) in hazard_list" :key="index" class="Hazards">  {{hazard_n}}; </span>
            <button class="confirm" @click="saveData" >Confirm</button>
        </div>
        
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
            show1: false,
            items_list:[],
            hazard_list:[],
            path:'',
            selectedFile: null,
            datal:{},
            quantity:1
        }
    },
    async fetch(){
      
    },
    methods:{
        async saveData(){
            let temp = []
            temp = await this.$axios.$post('http://localhost:3000/api/item',{
                name: this.datal[2], 
                quantity: Number(1),
                measure: Number(this.datal[0]),
                unit: this.datal[1],
                hazard: this.datal.splice(3,this.datal.length)
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
        },
        async uploadtest(){
            this.datal = await this.$axios.$get('http://localhost:3000/api/imageUpload',{
                params: { 
                    path:'C:/Users/sidon/Documents/Metalchemy_Vice_President_Engineering/Inventory_App/inventory/' + this.path,
                    val:'0' 
                }
            })
            this.hazard_list = this.datal.splice(3)
            this.show1 = true
        },
        onFileChanged (event) {
            this.selectedFile = event.target.files[0]
        },
        async onUpload() {
            const formData = new FormData()
            formData.append('File', this.selectedFile, this.selectedFile.name)
            this.path = await this.$axios.$post( 'http://localhost:3000/api/upload-file', formData,{headers: {
            'content-type': 'multipart/form-data'
            }});
            this.uploadtest()
        },
        decrease() {
            this.quantity -= 1
            this.quantity = this.quantity > 1 ? this.quantity : 1
        },
        increase() {
            this.quantity = parseInt(this.quantity) + 1
        },
    }
        

  }
</script>

<style >
.file{
    position: relative;
    top: 110px;
    left: 30px;
}
.upload{
    position: relative;
    top: 110px;
}
.Input_container{
    position: relative;
    top: 130px;
    left: 30px;
    width: 15cm;
}
.Name{
    position: relative;
    left: -5px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.control_quantity{
    position: relative;
    left: 50px;
    top: 0px;
}
.quant{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.less{
    position: relative;
    left: 5px;
}
.number{
    position: relative;
    left: 5px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.more{
    position: relative;
    left: 5px;
}
.Measure{
    position: relative;
    left: 25px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.Hazards{
    position: relative;
    left: -5px;
    top: 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: center;
}
.confirm{
    position: relative;
    left: 100px;
    top: 10px;
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