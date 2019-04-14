<template>
    <v-card class="grey lighten-3">
        <v-card-text>
            <span class="grey--text text--darken-1 body-2">
                Types of meat:
            </span>
            <span v-for="(type, index) in Restaurant.types" :key="type">
                {{type}}<span v-if="index+1 < Restaurant.types.length">, </span>
            </span><br>
            <v-layout class="mt-3">
                <span class="grey--text text--darken-1 body-2">
                    Professor Imbiss Rating:
                </span>
                <v-img v-for="index in Restaurant.rating" :key="index"
                    :src="require('../assets/doner_marker_dark_grey_30.svg')" contain height="24px" width="24px"
                    max-width="24px" max-height="24px" position="left left"></v-img>
            </v-layout>
            <div class="mt-3">
                <span class="grey--text text--darken-1 body-2">
                    Professor Imbiss
                </span><br>
            </div>
            <p v-for="before in Restaurant.long_description.befores" :key="before">
                {{before}}
            </p>
            <p>
                <span class="grey--text text--darken-1 body-2">
                    Meat:
                </span>
                {{Restaurant.long_description.structure.meat}}
            </p>
            <p>
                <span class="grey--text text--darken-1 body-2">
                    Sauce:
                </span>
                {{Restaurant.long_description.structure.sauce}}
            </p>
            <p>
                <span class="grey--text text--darken-1 body-2">
                    Condiments:
                </span>
                {{Restaurant.long_description.structure.condiments}}
            </p>
            <p>
                <span class="grey--text text--darken-1 body-2">
                    Bread:
                </span>
                {{Restaurant.long_description.structure.bread}}
            </p>
            <p v-for="after in Restaurant.long_description.afters" :key="after">
                {{after}}
            </p>
        </v-card-text>
    </v-card>
</template>
<script>
  export default {
    props: ["Restaurant"],
    data: () => ({
      
    }),
    beforeMount(){
          console.log(this.Restaurant)
      }
  }
</script>
<style>
</style>
