import Cat from "./cat-small.png";
import ImageSprite from "../graphics/imageSprite";
import SpriteOptions from "../graphics/spriteOptions";

export default class CatSprite extends ImageSprite {
    constructor(spriteOptions: SpriteOptions) {
      super(Cat, spriteOptions);
    }
}