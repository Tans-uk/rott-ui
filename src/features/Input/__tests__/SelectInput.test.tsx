import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {SelectInput} from '../components'

describe('Select Input -> Custom Input', () => {
  const testId = {
    select: {
      selectTestId: 'select-test-id',
      selectSelectionTestId: 'select-input-selection-test-id',
      modalTestId: 'select-modal-test-id',
      listTestId: 'select-list-test-id',
      selectedTestId: 'select-input-selected-item-test-id',
      selectedDescriptionTestId: 'selected-description-test-id',
    },
    search: {
      searchInputTestId: 'select-search-input-test-id',
      searchClearTestId: 'select-search-clear-test-id',
    },
  }

  const defaultLabel = 'Label Text'

  const mockData = [
    {label: 'Apple', value: 'apple', description: 'Apple Desc'},
    {label: 'Samsung', value: 'samsung', description: 'Samsung Desc'},
    {label: 'Huawei', value: 'huawei', description: 'Huawei Desc'},
    {label: 'Oppo', value: 'oppo', description: 'Oppo Desc'},
    {label: 'Realme', value: 'realme', description: 'Realme Desc'},
    {label: 'LG', value: 'lg', description: 'LG Desc'},
    {label: 'Vestel', value: 'vestel', description: 'Vestel Desc'},
    {label: 'Motorola', value: 'motorola', description: 'Motorola Desc'},
    {label: 'Panasonic', value: 'panasonic', description: 'Panasonic Desc'},
    {label: 'Ericson', value: 'ericson', description: 'Ericson Desc'},
    {label: 'HTC', value: 'htc', description: 'HTC Desc'},
    {label: 'ASUS', value: 'asus', description: 'ASUS Desc'},
    {label: 'Lenovo', value: 'lenovo', description: 'Lenovo Desc'},
  ]

  it('ilk render anında snapshot ile eşleşmeli', async () => {
    const {
      select: {selectTestId},
    } = testId
    const rendered = await render(
      <SelectInput name='test' testID={selectTestId} list={mockData} label={defaultLabel} />
    )

    expect(rendered).toMatchSnapshot()
  })

  it('select inputa tıklandığında input modal olarak açılmalı', async () => {
    const {
      select: {selectTestId, selectSelectionTestId, modalTestId},
    } = testId
    const {getByTestId} = await render(
      <SelectInput name='test' testID={selectTestId} list={mockData} label={defaultLabel} />
    )

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    fireEvent.press(selectInputValueContainer)

    const selectInputModal = getByTestId(modalTestId)
    expect(selectInputModal).toBeVisible()
  })

  it('select input secildigi zaman listenin ekranda gorunur olmali', async () => {
    const {
      select: {selectTestId, selectSelectionTestId, listTestId},
    } = testId
    const {getByTestId} = await render(
      <SelectInput name='test' testID={selectTestId} list={mockData} label={defaultLabel} />
    )

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    fireEvent.press(selectInputValueContainer)

    const listElement = await waitFor(() => getByTestId(listTestId))
    mockData.forEach((item) => {
      expect(listElement).toHaveTextContent(new RegExp(item.label))
    })
  })

  it('default value verildiginde varsayilan deger duzgun sekilde almali', async () => {
    const {
      select: {selectedTestId},
    } = testId
    const onSelectChangeMock = jest.fn()
    const {getByTestId} = await render(
      <SelectInput
        name='test'
        list={mockData}
        defaultValue='apple'
        label={defaultLabel}
        value='apple'
        onSelectChange={onSelectChangeMock}
      />
    )

    const selectedItemElement = getByTestId(selectedTestId)

    expect(selectedItemElement.children[0]).toBe('Apple')
  })

  it('onSelectChange verilmeden secim yapildiginda cokmemeli', async () => {
    const {
      select: {selectTestId, selectSelectionTestId},
    } = testId
    const {getByTestId, getByText} = await render(
      <SelectInput name='test' testID={selectTestId} list={mockData} label={defaultLabel} />
    )

    fireEvent.press(getByTestId(selectSelectionTestId))

    const item = getByText('Apple')
    expect(() => fireEvent.press(item)).not.toThrow()
  })

  it('secim yapildiginda deger dogru sekilde atanmali', async () => {
    const onSelectChangeMock = jest.fn()
    const {
      select: {selectTestId, selectSelectionTestId, selectedTestId},
    } = testId
    const rendered = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        list={mockData}
        label={defaultLabel}
        onSelectChange={onSelectChangeMock}
      />
    )

    const {getByTestId, getByText} = rendered

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    await waitFor(() => {
      fireEvent.press(selectInputValueContainer)
    })

    const listElement = getByText('Apple')
    await waitFor(() => {
      fireEvent.press(listElement)
    })

    const selectedElement = getByTestId(selectedTestId)
    expect(selectedElement.children[0]).toBe('Apple')
  })

  it('searchable ozelligi aktif ise search inputu ekranda olmali', async () => {
    const onSelectChangeMock = jest.fn()
    const {
      select: {selectTestId, selectSelectionTestId},
      search: {searchInputTestId},
    } = testId
    const {getByTestId, queryByTestId} = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        label={defaultLabel}
        list={mockData}
        onSelectChange={onSelectChangeMock}
        searchable
      />
    )

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    waitFor(() => {
      fireEvent.press(selectInputValueContainer)
    })

    const searchInputElement = queryByTestId(searchInputTestId)

    expect(searchInputElement).toBeOnTheScreen()
  })

  it('arama islemi aktif degil ise arama inputu ekranda olmamali', async () => {
    const onSelectChangeMock = jest.fn()
    const {
      select: {selectTestId, selectSelectionTestId},
      search: {searchInputTestId},
    } = testId
    const {getByTestId, queryByTestId} = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        label={defaultLabel}
        list={mockData}
        onSelectChange={onSelectChangeMock}
      />
    )

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    waitFor(() => {
      fireEvent.press(selectInputValueContainer)
    })

    const searchInputElement = queryByTestId(searchInputTestId)

    expect(searchInputElement).not.toBeOnTheScreen()
  })

  it('arama islemi aktif ise arama inputu ekranda olmali', async () => {
    const onSelectChangeMock = jest.fn()
    const {
      select: {selectTestId, selectSelectionTestId},
      search: {searchInputTestId},
    } = testId
    const rendered = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        label={defaultLabel}
        list={mockData}
        onSelectChange={onSelectChangeMock}
        searchable
      />
    )
    const {getByTestId} = rendered

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    waitFor(() => {
      fireEvent.press(selectInputValueContainer)
    })

    const searchInputElement = getByTestId(searchInputTestId)

    expect(searchInputElement).toBeOnTheScreen()
  })

  it('arama islemi duzgun filtrelemeli', async () => {
    const onSelectChangeMock = jest.fn()
    const {
      select: {selectTestId, selectSelectionTestId, listTestId},
      search: {searchInputTestId},
    } = testId
    const rendered = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        label={defaultLabel}
        list={mockData}
        onSelectChange={onSelectChangeMock}
        searchable
      />
    )
    const {getByTestId} = rendered

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    fireEvent.press(selectInputValueContainer)

    // Arama islemi
    const searchInputElement = getByTestId(searchInputTestId)
    fireEvent.changeText(searchInputElement, 'App')

    // List elementi çağırılır
    const listElement = getByTestId(listTestId)

    //Aranan kelimeye ait veri ekranda olmali
    expect(listElement).toHaveTextContent('Apple')
    //Aramayla alakasiz olan veri ekranda olmamali
    expect(listElement).not.toHaveTextContent('Oppo')
  })

  it('arama islemi sonrasi secim yapildiysa secim duzgun islemeli', async () => {
    const onSelectChangeMock = jest.fn()
    const {
      select: {selectTestId, selectSelectionTestId, listTestId, selectedTestId},
      search: {searchInputTestId},
    } = testId
    const rendered = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        label={defaultLabel}
        list={mockData}
        onSelectChange={onSelectChangeMock}
        searchable
      />
    )
    const {getByTestId, getByText} = rendered

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    fireEvent.press(selectInputValueContainer)

    // Arama islemi
    const searchInputElement = getByTestId(searchInputTestId)
    fireEvent.changeText(searchInputElement, 'App')

    // Aranilan Degere Ait Text Ekranda Olmali
    const listElement = getByTestId(listTestId)
    expect(listElement).toHaveTextContent('Apple')

    // Aranilan veriyi secme islemi
    const item = getByText('Apple')
    fireEvent.press(item)

    const selectedItem = getByTestId(selectedTestId)
    expect(selectedItem.children[0]).toBe('Apple')
  })

  it('arama icin herhangi bir text yazildi ise Clear Iconu ekranda olmali', async () => {
    const {
      select: {selectTestId, selectSelectionTestId},
      search: {searchInputTestId, searchClearTestId},
    } = testId
    const rendered = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        label={defaultLabel}
        list={mockData}
        searchable
      />
    )
    const {getByTestId} = rendered

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    fireEvent.press(selectInputValueContainer)

    // Arama islemi
    const searchInputElement = getByTestId(searchInputTestId)
    fireEvent.changeText(searchInputElement, 'App')

    // Temizleme Butonu
    let clearInputElement = getByTestId(searchClearTestId)

    expect(clearInputElement).toBeTruthy()
    expect((clearInputElement?.children[0] as any).props.name).toMatch(/remove-circle/i)
  })

  it('clear iconuna tiklandiginda searchText icerigi temizlenmeli', async () => {
    const {
      select: {selectTestId, selectSelectionTestId},
      search: {searchInputTestId, searchClearTestId},
    } = testId
    const rendered = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        label={defaultLabel}
        list={mockData}
        searchable
      />
    )
    const {getByTestId} = rendered

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    fireEvent.press(selectInputValueContainer)

    // Arama islemi
    const searchInputElement = getByTestId(searchInputTestId)
    fireEvent.changeText(searchInputElement, 'App')

    // Arama islemini temizler
    let clearInputElement = getByTestId(searchClearTestId)
    fireEvent.press(clearInputElement)

    const searchInputElementAfterRender = getByTestId(searchInputTestId)
    expect(searchInputElementAfterRender).toHaveProp('value', '')
  })

  it('clear iconu ile icerik temizlendiginde liste orjinal haline donmeli', async () => {
    const {
      select: {selectTestId, selectSelectionTestId, listTestId},
      search: {searchInputTestId, searchClearTestId},
    } = testId
    const rendered = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        label={defaultLabel}
        list={mockData}
        searchable
      />
    )
    const {getByTestId} = rendered

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    fireEvent.press(selectInputValueContainer)

    // Arama islemi
    const searchInputElement = getByTestId(searchInputTestId)
    fireEvent.changeText(searchInputElement, 'App')

    // Arama islemini temizler
    let clearInputElement = getByTestId(searchClearTestId)
    fireEvent.press(clearInputElement)

    // Tum liste ekranda var mi yok mu kiyaslar
    const listElement = getByTestId(listTestId)
    mockData.slice(0, 10).forEach((item) => {
      expect(listElement).toHaveTextContent(new RegExp(item.label))
    })
  })

  it('secim yapildiginda description parametresi var ise ekranda renderlanmali', async () => {
    const onSelectChangeMock = jest.fn()
    const {
      select: {selectTestId, selectSelectionTestId, selectedDescriptionTestId},
    } = testId
    const rendered = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        list={mockData}
        label={defaultLabel}
        description
        onSelectChange={onSelectChangeMock}
      />
    )
    const {getByTestId, getByText} = rendered

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    fireEvent.press(selectInputValueContainer)
    const listElement = getByText('Apple')
    fireEvent.press(listElement)

    const selectedDescElement = getByTestId(selectedDescriptionTestId)
    expect(selectedDescElement.children[0]).toBe('Apple Desc')
  })

  it('description propstan string deger aldiysa ekranda renderlanmali', async () => {
    const {
      select: {selectTestId, selectedDescriptionTestId},
    } = testId
    const mockDesc = 'Test Desc'

    const rendered = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        list={mockData}
        label={defaultLabel}
        description={mockDesc}
      />
    )

    const {getByTestId} = rendered
    const selectedDescElement = getByTestId(selectedDescriptionTestId)

    expect(selectedDescElement.children[0]).toBe(mockDesc)
  })

  it('select input propstan ve list ten es zamanli description almis ise secim yokken props degeri secim var ise data degeri description olarak atanmali', async () => {
    const onSelectChangeMock = jest.fn()
    const {
      select: {selectTestId, selectedTestId, selectSelectionTestId, selectedDescriptionTestId},
    } = testId
    const mockDesc = 'Test Desc'

    const rendered = await render(
      <SelectInput
        name='test'
        testID={selectTestId}
        list={mockData}
        label={defaultLabel}
        description={mockDesc}
        showDescription
        onSelectChange={onSelectChangeMock}
      />
    )

    const {getByTestId, getByText} = rendered

    // Mock Description Text Control
    const selectedDescElement = getByTestId(selectedDescriptionTestId)
    expect(selectedDescElement.children[0]).toBe(mockDesc)

    // Select Modal Acilir
    const selectInputValueContainer = getByTestId(selectSelectionTestId)
    await waitFor(() => {
      fireEvent.press(selectInputValueContainer)
    })

    // Bir Deger Secilir
    const listElement = getByText('Apple')
    await waitFor(() => {
      fireEvent.press(listElement)
    })

    const selectedElement = getByTestId(selectedTestId)
    const selectedDescElementRerender = getByTestId(selectedDescriptionTestId)

    expect(selectedElement.children[0]).toBe('Apple')
    expect(selectedDescElementRerender.children[0]).toBe('Apple Desc')
  })
})
