<script lang="ts">
   
</script>

<div class="hero " style="background-image: url(https://media.istockphoto.com/id/1197640540/photo/website-design-developing-programming-and-coding-technologies.jpg?s=612x612&w=0&k=20&c=6MbZ4JlFFtOKvQYHxNwvOC59W_25FCBgMiGJEz-B9rs=);">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Page Under Construction</h1>
        <p class="mb-5 text-3xl ">Our developrs are hard at work. Come back soon!</p>
        
      </div>
    </div>
  </div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    #container {
        /* display: flex; */
    }

    #topButtons {
        display: flex;
        height: 75px;
        align-items: center;

        /* border:1px solid green;
        position:absolute;
        top:1;
        display: flex;
        justify-content: space-between; */
    }
    #nftcollection {
        /* overflow: visible;
        width: 1300px;
        display: flex;
        margin-left: 7.5%;
        overflow-y: scroll;
        border: 1px solid white; */
    }
    .collapse {
        border-bottom-right-radius: 10px;
        
        /* border-bottom: 5px solid rgb(32, 55, 32);
        border-right: 5px solid rgb(32, 55, 32); */
        
        margin-top: 20px;
    }
    #container {
        /* display:flex; */
        /* flex-direction: column; */

        /* position:absolute;
        top:0;
        width:150%;
        border: 1px solid black; */
    }
    #leftbutton {
        position: fixed;
        top: 75px;
        left: 10%;
        width:80%;
        z-index:100;
    }
    #rightbutton {
        /* position: absolute; */
        /* right: 100px; */
    }
    #middle {
        /* width:70%; */
        /* position:absolute; */
        /* margin-left:30%; */
        right: 0;
        top: 80px;
        /* min-height:100vh; */
        /* overflow:hidden; */
        /* position:absolute; */
        /* display: flex; */
        /* left:50%; */
    }
    #left {
        /* border: 1px solid green; */
        display: flex;
        min-height: 100vh;
        /* border: 1px solid red; */

        /* width:25%; */
        /* position: absolute; */
        /* top: 65px; */
        /* z-index:1 */
        /* z-index: 6; */
        /* z-index:-11; */
        /* left:0; */
        /* transform: translateX(-100%); */
    }
    #leftmodal {
        position: fixed;
       border-top-right-radius: 40px;
        top:150px;
        height:100%;
        opacity:0.98;
        z-index:100;
    }
    
    #leftOverlay {
        /* z-index:90; */
        /* position:absolute; */
        /* z-index:10; */
    }
    #right2 {
        /* border: 1px solid yellow; */

        /* position: absolute; */
        /* top: 150px; */
        /* z-index:10; */
        /* top:100; */
        /* z-index:4; */
        /* position: relative; */
        /* right: 0; */
    }
    #rightOverlay {
        /* z-indez:10; */
        /* position: fixed; */
    }
    #middle {
        /* border: 1px solid brown; */
        /* position:fixed; */
        /* overflow-y: scroll; */
        /* width:50% */
    }
    #my-drawer {
        z-index: 110;
    }

    #profile {
        /* border: 1px solid blue; */
        /* width:1500px; */
        /* position:relative; */
        /* top:100px; */
        /* left:600px; */
        /* position:absolute; */
        /* top:5; */
    }

    .collapse-content {
        color: black;
    }

    .hero {
        height:100vh;
    }
</style>
