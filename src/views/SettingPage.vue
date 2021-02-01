<template>
    <div>
        <v-app-bar>
            Setting
        </v-app-bar>
        <v-main>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="SlotAMinPax"
                            type="number"
                            label="SlotA Min Pax"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="SlotAMaxPax"
                            type="number"
                            label="SlotA Max Pax"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="SlotAQueueLimit"
                            type="number"
                            label="SlotA Queue Limit"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="SlotBMinPax"
                            type="number"
                            label="SlotB Min Pax"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="SlotBMaxPax"
                            type="number"
                            label="SlotB Max Pax"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="SlotBQueueLimit"
                            type="number"
                            label="SlotB Queue Limit"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="SlotCMinPax"
                            type="number"
                            label="SlotC Min Pax"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="SlotCMaxPax"
                            type="number"
                            label="SlotC Max Pax"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="SlotCQueueLimit"
                            type="number"
                            label="SlotC Queue Limit"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-container >
                <v-row>
                <div v-if="CurrentMenu">
                    <v-col>
                    <v-img :src="CurrentMenu" style="height: 100px; width: 100px;"></v-img>
                    </v-col>
                </div>
                <v-col>
                <v-file-input
                    label="Menu upload"
                    accept="image/*"
                    filled
                    prepend-icon="mdi-camera"
                    v-model="NewMenu"
                    @change="Preview_image"
                ></v-file-input>
                </v-col>
                    <v-col>
                        <v-img :src="url" style="height: 100px; width: 100px;"></v-img>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row >
                    <v-col>
                        <v-btn
                            color="success"
                            @click="cancel"
                        >
                            Cancel
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn
                            color="success"
                            @click="save"
                        >
                            Save
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import {fb,db} from '../firebase'
export default {
    name:"SettingPage",
    data(){
        return{
            RestaurantId: "",
            SlotAMinPax: "",
            SlotAMaxPax: "",
            SlotAQueueLimit:"",
            SlotBMinPax: "",
            SlotBMaxPax: "",
            SlotBQueueLimit:"",
            SlotCMinPax: "",
            SlotCMaxPax: "",
            SlotCQueueLimit:"",
            CurrentMenu:"",
            NewMenu: null,
            image: null,
            url:""  
        }
    },
    methods:{
        LoadSettingData(){
            db.collection("Restaurant").where("RestaurantOwner", "==", fb.auth().currentUser.uid)
            .get()
            .then((querySnapshot) =>{
                querySnapshot.forEach((doc)=> {
                    this.RestaurantId = String(doc.data().RestaurantId);
                    this.CurrentMenu = doc.data().RestaurantMenu;
                    db.collection("Restaurant").doc(String(doc.data().RestaurantId)).collection("QueueSetting").doc("SlotA")
                    .get()
                    .then((Snapshot)=>{
                        this.SlotAMinPax = Snapshot.data().MinPax;
                        this.SlotAMaxPax = Snapshot.data().MaxPax;
                        this.SlotAQueueLimit = Snapshot.data().QueueLimit;
                    });
                    db.collection("Restaurant").doc(String(doc.data().RestaurantId)).collection("QueueSetting").doc("SlotB")
                    .get()
                    .then((Snapshot)=>{
                        this.SlotBMinPax = Snapshot.data().MinPax;
                        this.SlotBMaxPax = Snapshot.data().MaxPax;
                        this.SlotBQueueLimit = Snapshot.data().QueueLimit;
                    });
                    db.collection("Restaurant").doc(String(doc.data().RestaurantId)).collection("QueueSetting").doc("SlotC")
                    .get()
                    .then((Snapshot)=>{
                        this.SlotCMinPax = Snapshot.data().MinPax;
                        this.SlotCMaxPax = Snapshot.data().MaxPax;
                        this.SlotCQueueLimit = Snapshot.data().QueueLimit;
                    })
                });
            })
        },
        Preview_image(e) {
            this.url = URL.createObjectURL(e)
            this.image = e
        },
        cancel(){
            this.$router.replace("AdminPage")
        },
        save(){
            fb.storage().ref('images/'+ this.image.name)
            .put(this.image)
            .then(response => {
                response.ref.getDownloadURL().then((downloadURL) => {
                db.collection("Restaurant").doc(this.RestaurantId).update({RestaurantMenu:downloadURL})
                })
            })              
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueSetting").doc("SlotA").set({
                MinPax: this.SlotAMinPax,
                MaxPax: this.SlotAMaxPax,
                QueueLimit: this.SlotAQueueLimit
            });
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueSetting").doc("SlotB").set({
                MinPax: this.SlotBMinPax,
                MaxPax: this.SlotBMaxPax,
                QueueLimit: this.SlotBQueueLimit
            });
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueSetting").doc("SlotC").set({
                MinPax: this.SlotCMinPax,
                MaxPax: this.SlotCMaxPax,
                QueueLimit: this.SlotCQueueLimit
            });
            this.$router.replace("AdminPage")          
        }
    },
    created(){
        this.LoadSettingData();
    }
}
</script>
<style>

</style>