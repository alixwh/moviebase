<template>
  <div class="navbar">
    <div class="navbar-container">
      <div class="logo-container">
        <router-link to="/">
          Moviebase
        </router-link>
      </div>
      <div class="menu-container">
        <ul class="menu-list">
          <li class="menu-list-item">
            Movies
          </li>
          <li class="menu-list-item">
            Genres
          </li>
          <router-link to="/about">
            About
          </router-link>
        </ul>
      </div>
      <div class="profile-container">
        <span class="profile-text">Login</span>
        <div class="toggle">
          <font-awesome-icon
            icon="fa-solid fa-moon"
            class="toggle-icons"
          />
          <font-awesome-icon
            icon="fa-solid fa-sun"
            class="toggle-icons"
          />
          <div class="toggle-ball" />
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #151515;
}

.navbar {
  width: 100%;
  height: 80px;
  background-color: black;
}

.navbar-container {
  display: flex;
  align-items: center;
  padding: 0 25px;
  height: 100%;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
}

.navbar a {
  text-decoration: none;
  color: inherit;
}

.logo-container {
  color: #42b983;
  font-size: 30px;
  flex: 1;
}

.menu-container {
  flex: 6;
}

.menu-list {
  display: flex;
  list-style: none;
}

.menu-list-item {
  margin-right: 30px;
}

.profile-container {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.profile-text {
  margin: 0 20px;
}

.toggle {
  width: 40px;
  height: 20px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

}

.toggle-icons {
  color: goldenrod;
}

.toggle-ball {
  width: 18px;
  height: 18px;
  background-color: black;
  position: absolute;
  right: 1px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.25s ease all;
}

#app.active {
  background-color: white;
  color: black;
}

.navbar-container.active {
  background-color: #2b9f5f;
  color: black;
}

.logo-container.active {
  color: black;
}

.toggle.active {
  background-color: black;
}

.toggle-ball.active {
  background-color: white;
  transform: translateX(-20px);
}

@media only screen and (max-width: 940px) {
  .menu-container {
    display: none;
  }
}
</style>
