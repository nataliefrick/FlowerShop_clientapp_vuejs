<template>
    <li><span class="italics green-text">{{tool.title}}: </span><span class="bold"> {{tool.content}}</span></li>
</template>

<script>
export default {
    props: {
        tool: Object
    }
}
</script>

<style scoped>
span.italics {
    font-style: italic;
} 

span.bold {
    font-weight: bold;
}

li {
    margin: 0.6em 0;
}
</style>