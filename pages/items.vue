<template>
  <div>
      <div v-for="(item,index) in items_list" :key="index">
          <p class="description">{{item.name}}</p>
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
        console.log(this.items_list)
      
    }

}
</script>

<style>

</style>