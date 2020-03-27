<template>
  <div>
    <form>
      <p>where are you now?</p>
      <input class="zip" type="text" />
      <br />
      <p>radius</p>
      <input type="range" />
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
form {
  background-color: white;
  color: #f6d465;
  width: 60%;
  margin: 0 auto;
  top: 20px;
  padding: 30px;
  text-align: center;
}
.zip {
  border: 1px solid black;
}
</style>
