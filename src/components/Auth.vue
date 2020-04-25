<template>
  <div>
    <form>
      <v-text-field v-model="user.email" required label="email">
        {{
        user.email
        }}
      </v-text-field>
      <v-text-field
        v-model="user.password"
        required
        label="password"
        type="password"
      >{{ user.password }}</v-text-field>
      <v-btn @click.prevent="login" type="submit" color="#f6d465" class="white--text">Log in</v-btn>
      <br />
      <br />
      <p>wanna join in the fun?</p>
      <v-btn @click="createAccount">Sign up</v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    createAccount: function() {
      this.$router.push({ name: "createAccount" });
    },
    login: function() {
      this.$store.dispatch("auth/login", this.user, { root: true }).then(() => {
        // this.$store.dispatch("auth/fetchCurrentUser");
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>

<style>
form {
  background-color: white;
  color: #f6d465;
  width: 60%;
  margin: 0 auto;
  top: 20px;
  padding: 30px;
  text-align: center;
}
</style>
