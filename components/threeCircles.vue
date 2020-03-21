<template>
    <div id="three-circle-loader"></div>
</template>

<style scoped>
#three-circle-loader,
#three-circle-loader:before,
#three-circle-loader:after {
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    animation: threeCircleLoader 1.8s infinite ease-in-out;
}

#three-circle-loader:before,
#three-circle-loader:after {
    content: '';
    position: absolute;
}
#three-circle-loader {
    animation-delay: -0.15s;
}

#three-circle-loader:before {
    left: -3.5rem;
    animation-delay: -0.30s;
}
#three-circle-loader:after {
    left: 3.5rem;
}
@keyframes threeCircleLoader {
    0%,
    80%,
    100% {
        box-shadow: 0 2.5rem 0 -1.3rem;
    }
    40% {
        box-shadow: 0 2.5rem 0 0;
    }
}
</style>