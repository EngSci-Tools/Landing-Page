<template>
  <b-navbar class='shadow' type="dark" id='navbar'>
    <b-navbar-brand to='/'>EngSci Tools</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to='/tools'>Tools</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <!-- Right aligned content -->
        <b-nav-item href='https://forms.gle/u6avR1eZRPDQCgAr6' target='_blank'>Request Tool</b-nav-item>
        <b-nav-item href='https://discord.gg/bMdqarV' target='_blank'>Join</b-nav-item>
        <b-nav-item href='https://github.com/EngSci-Tools/Landing-Page/issues' target='_blank'>Issues</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
#navbar {
  background: $background-secondary;
}
</style>
