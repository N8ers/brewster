<template>
  <div>
    <form>
      <!-- <v-text-field required label="username">{{}}</v-text-field> -->
      <v-text-field v-model="user.email" required label="email">{{
        user.email
      }}</v-text-field>
      <v-text-field
        v-model="user.password"
        required
        label="password"
        type="password"
        >{{ user.password }}</v-text-field
      >
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
      <v-btn @click="loginPage">Login in</v-btn>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return { user: { email: "", password: "" } };
  },
  methods: {
    loginPage: function() {
      this.$router.push({ name: "auth" });
    },
    signup: function() {
      console.log("CreateAccount user: ", this.user);
      this.$store.dispatch("signup", this.user);
      // .then(() => {
      //    this.$router.push({ name: "home" });
      // });
    },
  },
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
