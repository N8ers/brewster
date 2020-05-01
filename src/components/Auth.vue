<template>
  <div>
    <form>
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
      <span v-if="signinFailed">
        <p>There was a problem with your username/password</p>
        <p>Try again or sign up below</p>
        <br />
      </span>
      <v-btn
        @click.prevent="login"
        type="submit"
        color="#f6d465"
        class="white--text"
        >Log in</v-btn
      >
      <br />
      <br />
      <p>wanna join in the fun?</p>
      <v-btn small @click="createAccount">Sign up</v-btn>
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
      },
      isLoading: false,
      signinFailed: false
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    createAccount: function() {
      this.$router.push({ name: "createAccount" });
    },
    login: function() {
      this.isLoading = true;
      this.$store
        .dispatch("auth/login", this.user, { root: true })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(() => {
          this.signinFailed = true;
        });
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
form {
  background-color: white;
  color: #f6d465;
  width: 60%;
  max-width: 400px;
  margin: 0 auto;
  top: 20px;
  padding: 30px;
  text-align: center;
}
</style>
