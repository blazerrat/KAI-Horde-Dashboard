import type { ImageData } from "@/stores/outputs";
import { useGeneratorStore } from '@/stores/generator';

// Fill the 'generateView' if we're given information in the url
const handleUrlParams = function() {
    if (!window.location.search.includes("?"))
        return;

    // Retrieve url params and parse them in a map
    const urlParams = window.location.search.replace("?", "");
    const params = urlParams.split("&");
    let paramMap = new Map();
    for (const param of params) {
        const [key, value] = param.split("=");
        // url decode
        const decodedValue = decodeURIComponent(value);
        paramMap.set(key,decodedValue);
    }
    console.log("URL params:", paramMap);

    // Fill ModelGenerationInputStable
    const imageData: ImageData = <ImageData>{
        id: -1,
        image: "",
        prompt: paramMap.get("prompt") ? paramMap.get("prompt") : "",
        sampler_name: paramMap.get("sampler_name") ? paramMap.get("sampler_name") : "k_euler",
        seed: paramMap.get("seed") ? paramMap.get("seed") : "",
        steps: paramMap.get("steps") ? Number(paramMap.get("steps")) : 30,
        cfg_scale: paramMap.get("cfg_scale") ? Number(paramMap.get("cfg_scale")) : 7,
        height: paramMap.get("height") ? Number(paramMap.get("height")) : 512,
        width: paramMap.get("width") ? Number(paramMap.get("width")) : 512,
        modelName: paramMap.get("model_name") ? paramMap.get("model_name") : "stable_diffusion",
        karras: paramMap.get("karras") ? Boolean(paramMap.get("karras")) : true,
    }

    // Pass to generator view
    const store = useGeneratorStore();
    store.generateText2Img(imageData);
}

export default handleUrlParams;
