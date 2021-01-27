<template>
    <div>
        <v-btn @click="Logout">
            LogOut
        </v-btn>
    </div>
</template>

<script>
import { fb} from '../firebase';
export default {
    name: "LogoutBtn",
    methods:{
        Logout(){
            fb
            .auth()
            .signOut()
            .then(() => {
                this.$router.replace({ name: "Home" });
            });
        }
    }
}
</script>