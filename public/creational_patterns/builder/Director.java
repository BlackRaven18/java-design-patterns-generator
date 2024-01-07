
public class $DIRECTOR_CLASSNAME$ {
	private $BUILDER_CLASSNAME$ builder;

	public $DIRECTOR_CLASSNAME$($BUILDER_CLASSNAME$ builder) {
		this.builder = builder;
	}

	public void changeBuilder($BUILDER_CLASSNAME$ builder) {
		this.builder = builder;
	}

	public void construct() {
		builder.buildStepA();
		builder.buildStepB();
		builder.buildStepZ();
	}
}