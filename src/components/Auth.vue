<template>
  <div>
    <form>
      <v-text-field required label="email"></v-text-field>
      <v-text-field required label="password" type="password"></v-text-field>
      <v-btn type="submit" color="#f6d465" class="white--text">Log in</v-btn>
      <br />
      <br />
      <br />
      <p>need an account?</p>
      <v-btn>Sign up</v-btn>
    </form>
  </div>
</template>

<script>
export default {};
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
