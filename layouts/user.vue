<template>
    <div>
        <UserHeader />
        <div id="slott">

            <slot ></slot>
        </div>
    </div>
</template>
<style>
    #slott{
        margin-left: 19vw;
        margin-top: 75px;
    }
    @media (max-width: 992px){
        #slott{
            margin-left: 13vw;

        }
    }
</style>