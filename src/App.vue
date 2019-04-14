<template>
  <v-app class="grey lighten-3">
    <v-toolbar app fixed clipped-left flat dark dense class="darkbg">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light white--text">Restaurant Creator </span>
        <span class="font-weight-thin success--text text-capitalize">Beta</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer class="darkbg lighten-1" v-model="drawer" clipped app fixed>
      <v-toolbar flat dark class="darkbg lighten-1">
        <v-text-field append-icon="search" @keyup="filterActions()" v-model="filterActionName" label="Search">
        </v-text-field>
      </v-toolbar>
      <v-divider></v-divider>
      <v-subheader dark>Actions</v-subheader>
      <v-list dense class="pt-0" dark>
        <v-list-tile active-class="active-menu-tile" class="grey--text text--lighten-1" v-for="action in filteredActions" :key="action.actionName" :to="action.actionUrl">
          <v-list-tile-action>
            <v-icon>{{action.actionIcon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title to="/createrestaurant">{{action.actionName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import CreateRestaurant from './components/CreateRestaurant'
import Home from './components/Home'
export default {
  name: 'App',
  components: {
    CreateRestaurant,
    Home
  },
  data () {
    return {
      drawer:true,
      actions: [{
        actionName: "Create Restaurant",
        actionIcon: "plus_one",
        actionUrl: "/createrestaurant"
      },
      {
        actionName:"Edit Restaurant",
        actionIcon:"edit",
        actionUrl: "/editrestaurant"
      }],
      filterActionName: "",
      filteredActions:[{
        actionName: "Create Restaurant",
        actionIcon: "plus_one",
        actionUrl: "/createrestaurant"
      },
      {
        actionName:"Edit Restaurant",
        actionIcon:"edit",
        actionUrl: "/editrestaurant"
      }]
    }
  },
  methods: {
    filterActions(){
      if (this.filterActionName == "")
      {
        this.filteredActions = this.actions
      }
      else {
        this.filteredActions = this.actions.filter((action) => {
        return action.actionName.toUpperCase().match(this.filterActionName.toUpperCase())
      })
      }
    }
  }
}
</script>
<style>
.active-menu-tile{
  color:white;
}
</style>
