import Dog from "./images/dog.svg";
import ImageSprite from "./imageSprite";
import SpriteOptions from "../graphics/spriteOptions";

export default class DogSprite extends ImageSprite {
    constructor(spriteOptions: SpriteOptions) {
      super(Dog, spriteOptions);
    }
}