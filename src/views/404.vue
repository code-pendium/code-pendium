<template>
  <div class="not-found-wrapper">
    <span class="glitch" data-text="404">404</span>
    <span class="subtext">NOT FOUND</span>
    <span class="bg-text">you shouldn"t be here</span>
    <br>
    <v-btn class="backbtn" small outlined to="/">go back</v-btn>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
.not-found-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: 
    linear-gradient(rgba(10, 10, 10, 0.6), rgba(0, 0, 0, 0.9)), 
    repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px),
    url("https://images.unsplash.com/photo-1437680041790-b7ed7b5a4950?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
	background-size: cover;
	background-position: center;
  font-family: "Montserrat", sans-serif;

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    left: 0;
    height: 5rem;
    width: 100%;
    background: rgba(255, 255, 255, 0.01);
    animation: moving-scanline 5s infinite linear;
  }

  &::after{
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    background: transparentize($color: #303030, $amount: 0.75);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    animation: flicker 0.15s infinite linear;
  }
}

@mixin glitchCopy { 
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@mixin glitchMain {
	position: relative;
	animation: glitch-skew 1s infinite linear alternate-reverse;
	
	&::before{
		@include glitchCopy;
		left: 2px;
		text-shadow: -2px 0 #ff00c1;
		clip: rect(44px, 450px, 56px, 0);
		animation: glitch-anim 5s infinite linear alternate-reverse;
	}
	
	&::after {
		@include glitchCopy;
		left: -2px;
		text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
		animation: glitch-anim2 1s infinite linear alternate-reverse;
	}
}

.glitch {
  @include glitchMain;
  color: white;
	font-size: 4rem;
	letter-spacing: 0.5rem;
}

.subtext {
	letter-spacing: 1rem;
}

.bg-text {
  position: absolute;
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.1);
  animation: flicker-2 0.5s infinite linear;
}

.backbtn {
  &::before {
    background: none;
    animation: none
  }
  &:hover, &:focus {
    animation: flicker 1s infinite linear;
  }
}

@keyframes glitch-anim {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      clip: rect(random(100)+px, 9999px, random(100)+px, 0);
			transform: skew((random(100) / 100) + deg);
    }
  }
}

@keyframes glitch-anim2 {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      clip: rect(random(100)+px, 9999px, random(100)+px, 0);
			transform: skew((random(100) / 100) + deg);
    }
  }
}

@keyframes glitch-skew {
  $steps: 10;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      transform: skew((random(10) - 5) + deg);
    }
  }
}

@keyframes moving-scanline {
  from { top: -10% }
  to { top: 100% }
}

@keyframes flicker {
  $steps:20;
  @for $i from 0 through $steps{
    #{percentage($i*(1/$steps))}{
      opacity: random();
    }
  }
}

@keyframes flicker-2 {
  $steps:20;
  @for $i from 0 through $steps{
    #{percentage($i*(1/$steps))}{
      opacity: round(random());
    }
  }
}
</style>