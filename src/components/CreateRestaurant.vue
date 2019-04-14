<template>
  <div>
    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'"
      :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      {{ snackbartext }}
      <v-btn color="primary" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-progress-linear v-if="progress" indeterminate color="primary"></v-progress-linear>
    <v-container>
      <v-dialog
      v-model="updateDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Restaurant exists
        </v-card-title>
        <v-card-text>
          This restaurant already exists! Do you want to update it?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            @click="updateDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="updateRestaurant"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-card class="grey lighten-3">
        <v-toolbar dark class="darkbg lighten-1" text-color="grey darken-5" flat dense>
          <v-toolbar-title>
            <span class="font-weight-light">Create New Restaurant</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <span class="subheading grey--text">Name and meat type</span>
            <v-text-field v-model="name" label="Name" :rules='nameRules'>
            </v-text-field>
            <v-item-group multiple>
              <v-layout row>
                <v-checkbox v-model="selectedTypes" label="Veal" value="veal" hide-details></v-checkbox>
                <v-checkbox v-model="selectedTypes" label="Marten" value="marten" hide-details></v-checkbox>
                <v-checkbox v-model="selectedTypes" label="Chicken" value="chicken" hide-details></v-checkbox>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
              </v-layout>
            </v-item-group>
            <div class="mt-4">
              <span class="subheading grey--text">Address</span>
              <v-layout row>
                <v-flex xs12 sm6>
                  <v-text-field class="mr-4" v-model="street" label="Street" :rules='streetRules'></v-text-field>
                </v-flex>
                <v-text-field class="mr-4" v-model="zipcode" label="Zip Code" :rules='zipcodeRules'></v-text-field>
                <v-text-field v-model="area" label="Area" :rules='areaRules'></v-text-field>
              </v-layout>
            </div>
            <span class="subheading grey--text">Descriptions</span>
            <v-textarea rows="3" counter="50" auto-grow label="Short Description" v-model="shortDescription">
            </v-textarea>
            <v-textarea rows="3" v-for="index in numberOfBeforeSegments" :key="index" auto-grow
              label="Long Description Before Segment" v-model="longDescriptionBefores[index-1]">
            </v-textarea>
            <v-btn small mt-0 flat right @click="addNewBeforeSegment()">+ Add new segment</v-btn>
            <v-btn v-if="numberOfBeforeSegments > 1" small mt-0 flat right @click="removeBeforeSegment()">- Remove
              segment</v-btn>
            <div class="mt-3">
              <span class="subheading grey--text">Structure</span>
              <v-textarea rows="2" label="Meat" v-model="meat">
              </v-textarea>
              <v-textarea rows="2" label="Sauce" v-model="sauce">
              </v-textarea>
              <v-textarea rows="2" label="Condiments" v-model="condiments">
              </v-textarea>
              <v-textarea rows="2" label="Bread" v-model="bread">
              </v-textarea>
              <v-textarea rows="3" v-for="index in numberOfAfterSegments" :key="index" auto-grow
                label="Long Description After Segment" v-model="longDescriptionAfters[index-1]">
              </v-textarea>
              <v-btn small mt-0 flat right @click="addNewAfterSegment()">+ Add new segment</v-btn>
              <v-btn v-if="numberOfAfterSegments > 1" small mt-0 flat right @click="removeAfterSegment()">- Remove
                segment</v-btn>
            </div>
            <div class="mt-3">
              <v-text-field v-model="rating" label="Professor Imbiss Rating"></v-text-field>
              <v-layout class="row">
                <v-text-field class="mr-4" v-model="longitude" label="Longitude" :rules='longitudeRules'></v-text-field>
                <v-text-field v-model="latitude" label="Latitude" :rules='latitudeRules'></v-text-field>
              </v-layout>
            </div>
            <v-btn class="success" @click="submit">
              Save Restaurant
            </v-btn>
            <v-btn class="primary" @click="previewRestaurant">
              Preview Restaurant
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <v-dialog v-model="dialog" max-width="750">
        <RestaurantPreview v-if="dialog" :Restaurant="restaurant"></RestaurantPreview>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
import RestaurantPreview from './RestaurantPreview'
import axios from 'axios'

export default {
  components: {
    RestaurantPreview
  },
  data() {
    return {
      updateDialog: false,
      dialog: false,
      name: "",
      restaurant: {},
      numberOfBeforeSegments: 1,
      numberOfAfterSegments: 1,
      selectedTypes: [],
      street: "",
      zipcode: "",
      area: "",
      shortDescription: "",
      longDescriptionBefores: [],
      meat: "",
      sauce: "",
      condiments: "",
      bread: "",
      longDescriptionAfters: [],
      rating: "",
      longitude: "",
      latitude: "",
      nameRules: [
            t => t.length > 0 || 'Restaurant name is required'
      ],
      streetRules: [
            t => t.length > 0 || 'Street is required'
      ],
      zipcodeRules: [
            t => t.length > 0 || 'Zipcode is required'
      ],
      areaRules: [
            t => t.length > 0 || 'Area is required'
      ],
      longitudeRules: [
            t => t.length > 0 || 'Longitude is required'
      ],
      latitudeRules: [
            t => t.length > 0 || 'Latitude is required'
      ],
      info: '',
      errors:[],
      snackbar: false,
      y: 'top',
      x: null,
      timeout: 6000,
      snackbartext: '',
      progress: false,
      mode:''
    }
  },
  methods: {
    addNewBeforeSegment() {
      this.numberOfBeforeSegments++
    },
    addNewAfterSegment() {
      this.numberOfAfterSegments++
    },
    removeBeforeSegment() {
      this.numberOfBeforeSegments--
    },
    removeAfterSegment() {
      this.numberOfAfterSegments--
    },
    previewRestaurant() {
      let restaurant = {
        id: 999,
        name: this.name,
        types: this.selectedTypes,
        address: {
          street: this.street,
          zipcode: this.zipcode,
          area: this.area
        },
        short_description: this.shortDescription,
        long_description: {
          befores: this.longDescriptionBefores,
          structure: {
            meat: this.meat,
            sauce: this.sauce,
            condiments: this.condiments,
            bread: this.bread
          },
          afters: this.longDescriptionAfters
        },
        rating: this.rating,
        coordinates: [
          this.longitude,
          this.latitude
        ]
      }
      console.log(JSON.stringify(restaurant))
      this.restaurant = restaurant
      this.dialog = true
    },
    submit(){
      if (this.$refs.form.validate()){
      console.log('saving...')
      let restaurant = {
        id: 999,
        name: this.name,
        types: this.selectedTypes,
        address: {
          street: this.street,
          zipcode: this.zipcode,
          area: this.area
        },
        short_description: this.shortDescription,
        long_description: {
          befores: this.longDescriptionBefores,
          structure: {
            meat: this.meat,
            sauce: this.sauce,
            condiments: this.condiments,
            bread: this.bread
          },
          afters: this.longDescriptionAfters
        },
        rating: this.rating,
        coordinates: [
          this.longitude,
          this.latitude
        ]
      }
      this.restaurant = restaurant
      this.saveRestaurant()
      }
    },
    saveRestaurant() {
      this.progress = true
      let headers = {
        "Content-Type": "application/json"
      }
        axios
          .post(process.env.VUE_APP_CREATEREST_API_URL, this.restaurant, {
            "headers": headers
          })
          .then(response => {
            this.info = response
            this.snackbartext = 'Restaurant created'
            this.progress = false
            this.snackbar = true
          })
          .catch(e => {
            this.errors.push(e)
            if(e.response.data.code===11000){
              this.updateDialog=true
            }
            else {
            console.log(e.response.data.code)
            this.snackbartext = '' + e
            this.progress = false
            this.snackbar = true
            }
          })
    },
    updateRestaurant() {
      console.log(JSON.stringify(this.restaurant))
      console.log(process.env.VUE_APP_UPDATEREST_API_URL)
      this.progress = true
      let headers = {
        "Content-Type": "application/json"
      }
        axios
          .post(process.env.VUE_APP_UPDATEREST_API_URL, this.restaurant, {
            "headers": headers
          })
          .then(response => {
            this.info = response
            this.snackbartext = 'Restaurant updated'
            this.progress = false
            this.updateDialog = false
            this.snackbar = true
          })
          .catch(e => {
            this.errors.push(e)
            this.snackbartext = '' + e
            this.progress = false
            this.snackbar = true
          })
    }
  }
}
</script>
<style>
</style>
