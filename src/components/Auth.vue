<template>
  <div>
    <form>
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
        @click.prevent="login"
        type="submit"
        color="#f6d465"
        class="white--text"
        >Log in</v-btn
      >
      <br />
      <br />
      <v-btn
        @click.prevent="login"
        type="submit"
        color="red"
        class="white--text"
        >fake 'Log in'</v-btn
      >
      <br />
      <br />
      <br />
      <p>wanna join in the fun?</p>
      <v-btn @click="createAccount">Sign up</v-btn>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    createAccount: function() {
      this.$router.push({ name: "createAccount" });
    },
    fakeLogin: function() {
      this.$store.dispatch("fakeLogin");
    },
    login: function() {
      this.$store.dispatch("login", this.user).then(() => {
        this.$router.push({ name: "home" });
      });
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
