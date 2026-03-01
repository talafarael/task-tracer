package enviroment

type Environment string

const (
	Development Environment = "development"
	Production  Environment = "production"
)

func (e Environment) String() string {
	switch e {
	case Development:
		return string(Development)
	case Production:
		return string(Production)
	default:
		return string(Development)
	}
}
