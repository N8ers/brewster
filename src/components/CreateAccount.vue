<template>
  <div>
    <form>
      <v-text-field v-model="user.name" required label="username">
        {{ user.name }}
      </v-text-field>
      <v-text-field v-model="user.email" required label="email">
        {{ user.email }}
      </v-text-field>
      <v-text-field
        v-model="user.password"
        required
        label="password"
        type="password"
        >{{ user.password }}</v-text-field
      >
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <v-btn
        @click.prevent="signup"
        type="submit"
        color="#f6d465"
        class="white--text"
        >Sign Up!</v-btn
      >
      <br />
      <br />
      <br />
      <p>already have an account?</p>
      <v-btn small @click="loginPage">Login</v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: { name: "", email: "", password: "" },
      isLoading: false
    };
  },
  methods: {
    ...mapActions("auth", ["signup"]),
    loginPage: function() {
      this.$router.push({ name: "auth" });
    },
    signup: function() {
      this.isLoading = true;
      this.$store
        .dispatch("auth/signup", this.user, { root: true })
        .then(() => {
          this.$router.push({ name: "home" });
        });
      this.isLoading = false;
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
