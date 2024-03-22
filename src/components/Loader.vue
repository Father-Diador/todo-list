<template>
    <div class="loader__wrapper">
        <span class="loader"></span>
        <span class="loader"></span>
        <span class="loader"></span>
    </div>
</template>

<style scoped lang="scss">
.loader {
  width: 108px;
  height: 16px;
  background:
    radial-gradient(circle 8px at 8px center, $accent 100%, transparent 0),
    radial-gradient(circle 8px at 8px center, $accent 100%, transparent 0);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  position: relative;
  animation: ballX 1s linear infinite;

  &__wrapper {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
.loader:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: $accent;
  inset:0;
  margin:auto;
  animation: moveX 1s cubic-bezier(0.5,300,0.5,-300) infinite;
}
@keyframes ballX {
  0%,25%,50%,75%, 100%  {background-position: 25% 0,75% 0}
  40%     {background-position: 25% 0,85% 0}
  90%     {background-position: 15% 0,75% 0}
}
@keyframes moveX {
  100% {transform:translate(0.15px)}
}
</style>