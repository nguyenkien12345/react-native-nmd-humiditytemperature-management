import { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const dataAccordion = [
  {
    id: '1',
    title: 'Nội dung 1',
    description:
      'Đây là mô tả của nội dung 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut dapibus tellus. Integer ut blandit diam. Donec vel neque eu neque laoreet auctor at non leo. Suspendisse efficitur ipsum velit, ut posuere velit varius sit amet. Nam maximus vestibulum enim a tempor. Donec rhoncus magna sed augue tincidunt pellentesque vitae non tortor. Donec in purus et urna dignissim ultrices. Proin egestas auctor turpis, id tristique orci molestie id. Morbi a felis ut erat mattis tempor feugiat iaculis libero. Integer a nibh eget nisi eleifend ornare sed quis dui.'
  },
  {
    id: '2',
    title: 'Nội dung 2',
    description:
      'Đây là mô tả của nội dung 2. Mauris ac mattis ante. Praesent vel tortor eu nisl tincidunt pellentesque quis ut turpis. Vestibulum fermentum dolor augue, eget suscipit quam rhoncus et. Integer finibus, risus eget vulputate ullamcorper, tortor ante scelerisque mi, ac interdum leo ligula eu velit. Nullam dignissim mattis lorem non aliquam. Mauris eu orci tincidunt, mollis ante et, volutpat tortor. Curabitur eget eleifend dui. Nam et libero at mi malesuada sagittis.'
  },
  {
    id: '3',
    title: 'Nội dung 3',
    description:
      'Đây là mô tả của nội dung 3. Cras suscipit tincidunt lacus vitae maximus. Proin ac dui vulputate sem porta bibendum. Cras congue a mi nec hendrerit. Praesent arcu diam, maximus vitae mauris sed, venenatis euismod eros. Quisque auctor eros nulla, at sagittis urna accumsan in. Nulla ultricies, enim eu porttitor dignissim, dui nunc auctor nunc, congue porttitor nisl tellus quis tortor. Praesent tincidunt sem et nunc sollicitudin bibendum. Nullam nec aliquet nibh, at lobortis lacus. Duis pharetra commodo vehicula. Sed nec cursus tortor.'
  }
]

function Accordion() {
  const [openAccordion, setOpenAccordion] = useState({
    1: false,
    2: false,
    3: false
  })

  const toggleAccordion = (id) => {
    setOpenAccordion((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  const listIdAccordionShow = Object.keys(openAccordion).filter((id) => openAccordion[id])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.accordion}>
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (scroll indicator)
        >
          {dataAccordion.length > 0 &&
            dataAccordion.map((item) => {
              const isAccordionOpen = listIdAccordionShow.includes(item.id)
              const iconAngle = isAccordionOpen ? 'angle-up' : 'angle-down'

              return (
                <View key={item.id} style={styles.card}>
                  <TouchableOpacity style={styles.cardTop} onPress={() => toggleAccordion(item.id)}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Icon name={iconAngle} size={30} color='white' />
                  </TouchableOpacity>

                  {isAccordionOpen && (
                    <View style={styles.cardContent}>
                      <Text style={styles.description}>{item.description}</Text>
                    </View>
                  )}
                </View>
              )
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  accordion: {
    flex: 1,
    paddingBlock: 50
  },
  scrollView: {
    flex: 1
  },
  card: {
    marginBottom: 20
  },
  cardTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    backgroundColor: '#81ecec',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  cardContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#dfe6e9',
    height: 'auto',
    marginTop: 8
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    textAlign: 'left'
  },
  description: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'left',
    color: '#000'
  }
})

export default Accordion
