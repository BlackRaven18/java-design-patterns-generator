
public class Director {
	private Builder builder;

	public Director(Builder builder) {
		this.builder = builder;
	}

	public void changeBuilder(Builder builder) {
		this.builder = builder;
	}

	public void Construct() {
		builder.buildStepA();
		builder.buildStepB();
		builder.buildStepZ();
	}
}