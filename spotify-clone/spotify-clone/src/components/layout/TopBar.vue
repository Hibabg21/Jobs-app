<template>
  <header class="topbar">
    <div class="arrows">
      <button @click="$router.back()"><i class="fa fa-chevron-left"></i></button>
      <button @click="$router.forward()"><i class="fa fa-chevron-right"></i></button>
    </div>
    <div class="user"><i class="fa fa-user"></i></div>
  </header>
</template>

<style scoped>
.topbar { position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between;
          padding: 16px 24px; background: rgba(18,18,18,.8); backdrop-filter: blur(10px); }
.arrows { display: flex; gap: 8px; }
.arrows button, .user { width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,.7);
                        display: flex; align-items: center; justify-content: center; }
</style>