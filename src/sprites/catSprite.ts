import Cat from "./images/cat.svg";
import ImageSprite from "./imageSprite";
import SpriteOptions from "../graphics/spriteOptions";

export default class CatSprite extends ImageSprite {
    constructor(spriteOptions: SpriteOptions) {
      super(Cat, spriteOptions);
    }
}