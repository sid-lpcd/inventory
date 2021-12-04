<template>
	<div class="container">
		<input type="file" @change="onFileChanged">
        <button @click="onUpload">Upload!</button>
	</div>
</template>

<script>
	export default {
		data() {
            return {
                selectedFile: null
            }
        },
        methods: {
            onFileChanged (event) {
               this.selectedFile = event.target.files[0]
            },
            async onUpload() {
                const formData = new FormData()
                formData.append('File', this.selectedFile, this.selectedFile.name)
                const path = await this.$axios.$post( 'http://localhost:3000/api/upload-file', formData,{headers: {
                'content-type': 'multipart/form-data'
                }});
                console.log(path
                )
            }
			
		}
	}
</script>