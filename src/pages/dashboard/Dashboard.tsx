import { Card, Col, Flex, Image, Row, Statistic, Typography } from "antd"
import { Bag } from "../../components/icons/Bag"
import Bar from "../../components/icons/Bar"
import OrangeBag from "../../components/icons/OrangeBag"
import { useCurrentTime } from "../../hooks/useCurrentTime"
import { useAuthStore } from "../../store/store"
import { TitleStyles, UserNameStyles } from "./styles/Dashboard.styles"
import { BarChartIcon } from "../../components/icons/BarChart"
import Chip from "../../components/common/Chip"

const Dashboard = () => {
  const { user } = useAuthStore()
  const { currentTGreeting } = useCurrentTime()

  return (
    <div>
      <Typography style={TitleStyles}>
        {currentTGreeting},{" "}
        <span style={UserNameStyles}>{user?.firstName}</span>😄
      </Typography>
      <Flex
        gap={48}
        style={{
          width: "100%",
          margin: "48px 0",
        }}
      >
        <Flex
          vertical
          gap={16}
          style={{
            width: "40%",
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Flex gap={20}>
                  <Bag />
                  <Statistic title="Active Users" value={112893} />
                </Flex>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Flex gap={20}>
                  <Bar />
                  <Statistic
                    title="Account Balance (CNY)"
                    value={112893}
                    precision={2}
                  />
                </Flex>
              </Card>
            </Col>
          </Row>
          <Card
            title={
              <Flex
                gap={10}
                style={{
                  margin: "16px 0px",
                }}
              >
                <Bar />
                <Typography.Title level={4}>Sales</Typography.Title>
              </Flex>
            }
          >

            <Image src="/c1.png" />
          </Card>
        </Flex>
        <Card
          title={
            <Flex
              gap={10}
              style={{
                margin: "16px 24px",
              }}
            >
              <OrangeBag />
              <Typography.Title level={4}>Recent Orders</Typography.Title>
            </Flex>
          }
          style={{
            width: "50%",
          }}
        >
          <Flex
            vertical
            style={{
              margin: "0.5rem 1rem",
            }}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                style={{
                  width: "100%",
                  margin: "0.5rem 0",
                  padding: "12px 24px",
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px",
                }}
              >
                <Flex gap={10} align="center" justify="space-between">
                  <Flex
                    vertical
                    gap={3}
                    style={{
                      width: "50%",
                    }}
                  >
                    <Statistic
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#000000",
                      }}
                      title="Rakesh Sen"
                      value="Madhyamgram, Kolkata"
                      valueStyle={{
                        fontWeight: 500,
                        fontSize: "12px",
                      }}
                    />
                  </Flex>
                  <Flex
                    align="center"
                    justify="space-between"
                    style={{
                      width: "40%",
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontWeight: "bolder",
                        fontSize: "1rem",
                      }}
                    >
                      ₹ 1000
                    </Typography.Text>

                    <Chip
                      color={item % 2 == 0 ? "#219653" : "#14AAFF"}
                      backgroundColor={item % 2 == 0 ? "#D1F2EB" : "#D6E4FF"}
                      borderColor={item % 2 == 0 ? "#219653" : "#14AAFF"}
                      label={item % 2 == 0 ? "preparing" : "on the way"}
                    />
                  </Flex>
                </Flex>
              </div>
            ))}
            <Typography.Text
              style={{
                textAlign: "left",
                marginTop: ".5rem",
                color: "#5138EE",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              See all orders
            </Typography.Text>
          </Flex>
        </Card>
      </Flex>
    </div>
  )
}
export default Dashboard
