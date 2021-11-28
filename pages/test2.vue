<template>
  <div>
      <select v-model="selected" @change="getType" multiple>
        <option value="Name">Name</option>
        <option value="Id">Id</option>
        <option value="Date of Entry">Date of Entry</option>
        <option value="Hazards">Hazards</option>
    </select>
    <span>Selected: {{ selected }}</span>

  </div>
</template>

<script>
export default {
data(){
        return{
            visibleErr: false,
            selected: 'Name',
            placeholder_text: this.getType(),   
            item_list: []    
        }
    },
 methods:{
        getType(){
            console.log(this.selected)
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
        
    }
}
</script>

<style>

</style>